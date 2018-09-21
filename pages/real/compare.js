import React, { Component } from 'react';

import {
    Button,
    TextField,
    Card,
    CardContent,
    Typography,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemSecondaryAction,
    Collapse,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
    Table,
    Badge,
    Menu,
    MenuItem
} from '@material-ui/core';

import Warning from '@material-ui/icons/Warning'
import amber from '@material-ui/core/colors/amber'

import Router from 'next/router'

import Layout from '../../components/Layout';
import ProductDialog from '../../components/ProductDialog'

import { PCP_SERVER } from '../../res/ImportantThings'

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

class Compare extends Component {
    constructor(props){
        super(props);
        this.state = {
            user : { user : {}},
            toBeComparedItems : [],
            results : [],
            showMissingProductsModalOpen : false,
            dialogItems : [],
            dialogTitle : '',
        };
    }


    getProductEquivalents(toBeCompared){
        return fetch(`${PCP_SERVER}/products/getProducts?products=${JSON.stringify(toBeCompared)}`)
        .then(response => response.json())
    }

    getSupermarkets(){
        return fetch(`${PCP_SERVER}/supermarkets`)
        .then(response => response.json())
    }

    getAll(toBeCompared){
        return Promise.all([this.getProductEquivalents(toBeCompared),this.getSupermarkets()])
    }

    handleClose = value => {
        this.setState({
            showMissingProductsModalOpen: false,
        });
    };

    showSelectedProducts(){
        this.setState({
            showMissingProductsModalOpen : true,
            dialogItems : this.state.myProducts,
            dialogTitle : 'Product List'
        });
    };

    showAllProducts(products){
        this.setState({
            showMissingProductsModalOpen : true,
            dialogItems : products,
            dialogTitle : 'Items in Supermarket'
        });
    };

    showMissingProducts(missingProducts){
        this.setState({
            showMissingProductsModalOpen : true,
            dialogItems : missingProducts,
            dialogTitle : 'Missing Items'
        });
    }

    componentDidMount(){
        var user = window.sessionStorage.getItem('info');
        if (user === null){
            user = { user : {}}
        }else{
            user = JSON.parse(user);
            if(user === {}){
                user = {
                    ...user,
                    user: {
                        ...user.user,
                        admin : user.admin,
                    }
                }
            }else{
                user = { user : {}}
            }
        }
        this.setState({ user });

        var toBeCompared = JSON.parse(localStorage.getItem('selectedItems'));
        this.getAll(toBeCompared)
        .then(([products,supermarkets])=>{
            var sprMkt = [];
            var prod = products.res.slice();
            supermarkets.res.map((item) => {
                var totalAmount = 0;
                var msng = [];
                var avail = [];
                prod.map((product) => {
                    if(product.p_marketID == item.supermarketID && (product.p_availability)){
                        totalAmount += product.p_price;
                        const p = {
                            p_ID: product.p_ID,
                            p_name: product.p_name,
                            p_price : product.p_price,
                        };
                        avail.push(p);
                    }else if(product.matched_marketID == item.supermarketID && (product.matched_availability)){
                        totalAmount += product.matched_price;
                        const p = {
                            p_ID: product.matched_ID,
                            p_name: product.matched_name,
                            p_price : product.matched_price,
                        };
                        avail.push(p);
                    }else{
                        const missing = product.matched_marketID == item.supermarketID;
                        const p = {
                            p_ID: product.p_ID,
                            p_name: `${missing ? (`[Not available] ${product.p_name}`) :(product.p_name) }`,
                            p_price : product.p_price,
                        };
                        msng.push(p);
                    }
                });
                sprMkt.push({
                    supermarketID : item.supermarketID,
                    supermarketName : item.supermarketName,
                    total : totalAmount,
                    missing : msng,
                    available : avail,
                });
            });
            sprMkt.sort(function(a, b){return a.total - b.total})
            this.setState({ results : sprMkt , myProducts : prod});
        });
    }

    componentWillUnmount(){
        this.setState({
            toBeComparedItems : [],
            results : [],
            showMissingProductsModalOpen : false,
            dialogItems : [],
            dialogTitle : '',
        });
    }

    render() {
        return (
        <Layout user={this.state.user.user} page="Compare">
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="stretch"
                spacing={40}
                >
                <Grid item md={12}>
                    <Typography variant="display3" style={{textAlign : 'center'}}>
                        PRICE CHECKER PROGRAM
                    </Typography>
                </Grid>
                <Grid item md={12}>
                    <Button onClick={() => this.showSelectedProducts()} variant="outlined" color="primary" style={{backgroundColor : '#299ea7', color : 'white' }}>
                        ITEM LIST
                    </Button>
                </Grid>
                <Grid item md={12}>
                    <Paper style={{padding : 20 , backgroundColor : `rgba(255,255,255,0.8)`}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Supermarket</TableCell>
                                    <TableCell numeric>Total Price</TableCell>
                                    <TableCell numeric></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {this.state.results.map(row => {
                                return (
                                <TableRow key={row.supermarketID}>
                                    <TableCell component="th" scope="row">
                                        <Button onClick={() => this.showAllProducts(row.available)}>
                                            List
                                        </Button>
                                        {`   ${row.supermarketName}`}
                                    </TableCell>
                                    <TableCell numeric>
                                        <b>Php {row.total}</b>
                                    </TableCell>
                                    <TableCell numeric>
                                        {row.missing.length > 0 ? (
                                            <Button onClick={() => this.showMissingProducts(row.missing)}>
                                                <Warning style={{ color: amber[700]}}/>
                                                {row.missing.length} missing
                                            </Button>
                                        ):<div />}
                                    </TableCell>

                                </TableRow>
                                );
                            })}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
                {isEmpty(this.state.results) ? ('') : (
                    <Grid item md={12}>
                        <Grid container
                            direction="column"
                            justify="flex-start"
                            alignItems="stretch"
                            spacing={16}
                            >
                            <Grid item>
                                <Typography variant="display1" style={{textAlign : 'center' , color : 'white'}}>
                                    { (this.state.results.length > 1 ? (
                                            (this.state.results[0].total == this.state.results[1].total ? (
                                                `Well done! You can't save money.`
                                            ) : (
                                                this.state.results[0].missing.length==0 ? (
                                                    `Well done! You can save more at ${this.state.results[0].supermarketName}.`
                                                ) : (
                                                    `Well done! You can save more at ${this.state.results[0].supermarketName}. But there are missing items.`
                                                )
                                            ))
                                        ) : (
                                            `Well done! You can save more at one and only ${this.state.results[0].supermarketName}`
                                        ))}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography style={{ textAlign : 'center' }}>
                                    <Button variant="outlined" color="primary" style={{backgroundColor : '#299ea7', color : 'white' }}
                                        onClick={() => {
                                            this.setState({
                                                toBeComparedItems : [],
                                                results : [],
                                                showMissingProductsModalOpen : false,
                                                dialogItems : [],
                                                dialogTitle : '',
                                            });
                                            Router.push('/')
                                        }}>
                                        OK
                                    </Button>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </Grid>
            <ProductDialog
                open={this.state.showMissingProductsModalOpen}
                onClose={this.handleClose}
                items={this.state.dialogItems}
                title={this.state.dialogTitle}
                showSupermarket={false}
            />
        </Layout>
        );
    }
}

export default Compare;
