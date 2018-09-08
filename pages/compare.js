import React, { Component } from 'react';
import Layout from '../components/Layout';

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

import Router from 'next/router'

import ProductDialog from '../components/ProductDialog'

import { PCP_SERVER } from '../res/ImportantThings'

import Warning from '@material-ui/icons/Warning'
import amber from '@material-ui/core/colors/amber'

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
            resultModalOpen: false,
            toBeComparedItems : [],
            results : [],
            anchorEl : null,
            missinganchorEl : null,
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

    componentDidMount(){
        var user = window.sessionStorage.getItem('info');
        if (user === null){
            user = { user : {}}
        }else{
            user = JSON.parse(user)
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
                    if(product.p_marketID == item.supermarketID){
                        totalAmount += product.p_price;
                        avail.push(product);
                    }else if(product.matched_marketID == item.supermarketID){
                        totalAmount += product.matched_price;
                        avail.push(product);
                    }else{
                        msng.push(product);
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
            console.log(sprMkt);
            sprMkt.sort(function(a, b){return b.total - a.total})
            this.setState({ results : sprMkt });
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
                    <Paper style={{padding : 20}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Supermarket</TableCell>
                                    <TableCell numeric>Total Price</TableCell>
                                    <TableCell numeric>Missing</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {this.state.results.map(row => {
                                return (
                                <TableRow key={row.supermarketID}>
                                    <TableCell component="th" scope="row">
                                        {/* <Button onClick={() => console.log("TODO: show list of products")}>
                                            show list
                                        </Button> */}
                                        {row.supermarketName}
                                    </TableCell>
                                    <TableCell numeric>   
                                        <b>Php {row.total}</b>
                                    </TableCell>                
                                    <TableCell numeric>
                                        {row.missing.length > 0 ? (
                                            <Button onClick={() => console.log("TODO: show missing products")}>
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
                <Grid item md={12}>
                    <Typography variant="display1" style={{textAlign : 'center'}}>
                        {isEmpty(this.state.results) ? ('') : (
                        `Well done! You can save more at ${this.state.results[0].supermarketName}`
                        )}
                    </Typography>
                </Grid>
            </Grid>
        </Layout>
        );
    }
}

export default Compare;
