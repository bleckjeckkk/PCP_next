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
    Collapse
} from '@material-ui/core';

import Router from 'next/router'

import ProductDialog from '../components/ProductDialog'

import { PCP_SERVER } from '../res/ImportantThings'

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
            text : '',
            prevText : '',
            user : { user : {}},
            resultModalOpen: false,
            queriedItems : [{ id : 0 , email: 'username@gmail.com' }, {id : 1 , email:'user02@gmail.com' }],
            selectedItems : [],
        };
    }
  
    removeFromList = (product) => {
        var temp = this.state.selectedItems.slice();
        const index = temp.indexOf(product);
        temp.splice(index,1);
        this.setState({
            resultModalOpen: false,
            selectedItems : temp, 
        });
    };

    handleClickOpen = () => {
        console.log(`${PCP_SERVER}/products/find?productName=${this.state.text}`);
        fetch(`${PCP_SERVER}/products/find?productName=${this.state.text}`)
        .then(response => response.json())
        .then(json => {
            this.setState({ queriedItems : json.res, resultModalOpen:true });
        });
    };
    
    handleClose = value => {
        if(isEmpty(value)){
            this.setState({
                resultModalOpen: false,
            });
            return;
        }
        var temp = this.state.selectedItems.slice();
        var found = temp.some(function (prod) {
            return (prod.p_ID === value.p_ID) || (prod.matched_ID === value.p_ID);
        });
        if(!found){
            temp.push(value);
        }
        this.setState({
            resultModalOpen: false,
            selectedItems : temp 
        });
    };

    componentDidMount(){
        var user = window.sessionStorage.getItem('info');
        if (user === null){
            user = { user : {}}
        }else{
            user = JSON.parse(user)
        }
        this.setState({ user });
    }

    handleClick(){
        localStorage.setItem('key', this.state.text);
    }

    onChange(event){
        this.setState({
            text : event.target.value,
        });
    }

    saveList(){
        const temp = this.state.selectedItems.slice();
        var items = [];
        temp.map( (item) => {
            items.push(item.p_ID);
        });
        localStorage.setItem('selectedItems', JSON.stringify(items));
    }

    render() {
        return (
        <Layout user={this.state.user.user} page="Home Screen">
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
                        <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            spacing={16}
                            >
                            <Grid item md = {2}>
                            </Grid>
                            <Grid item md = {7}>
                                <TextField
                                id="name"
                                label="Product"
                                value={this.state.text}
                                onChange={this.onChange.bind(this)}
                                margin="normal"
                                fullWidth
                                />
                            </Grid>
                            <Grid item md = {1}>
                                <Button variant="contained" onClick={this.handleClickOpen.bind(this)}>Search</Button>
                            </Grid>
                            <Grid item md = {2}>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item md={12}>
                    <Collapse in={!isEmpty(this.state.selectedItems)}>
                        <Grid container
                            direction="column"
                            justify="flex-start"
                            alignItems="stretch"
                            spacing={16}
                            >
                            <Grid item md={12}>
                                <Grid container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                    >
                                    <Grid item md={3} sm={false}>
                                    </Grid>
                                    <Grid item md={6} sm={12}>
                                        <Paper style={{ maxHeight : 200  , overflowY : 'auto' , padding : 20}}>
                                            <List style={{ maxHeight : 200 }}>
                                            {this.state.selectedItems.map( item => {
                                                return(
                                                    <ListItem key={item.p_ID}>
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            {item.p_ID}
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={item.p_name}
                                                        secondary={`${item.p_price} -- ${item.p_market}`}
                                                    />
                                                    <ListItemSecondaryAction>
                                                        <Button color="secondary" onClick={() => this.removeFromList(item)}>X</Button>    
                                                    </ListItemSecondaryAction>
                                                    </ListItem>
                                                )
                                            },this)}
                                            </List>
                                        </Paper>
                                    </Grid>
                                    <Grid item md={3} sm={false}>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                    spacing={16}
                                    >
                                    <Grid item>
                                        <Button color="primary" variant="contained" onClick={() => {this.saveList(); Router.push('/compare')}}>COMPARE</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button color="primary" variant="contained" onClick={() => this.saveList()}>SAVE</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Collapse>
                </Grid>
            </Grid>
            <ProductDialog
                open={this.state.resultModalOpen}
                onClose={this.handleClose}
                items={this.state.queriedItems}
            />
        </Layout>
        );
    }
}

export default Index;
