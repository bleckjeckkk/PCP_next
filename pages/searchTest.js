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
    ListItemSecondaryAction 
} from '@material-ui/core';

import Router from 'next/router'

import ProductDialog from '../components/ProductDialog';

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
        console.log("removeFromList");
        console.log(product);
        var temp = this.state.selectedItems.slice();
        const index = temp.indexOf(product);
        temp.splice(index,1);
        this.setState({
            resultModalOpen: false,
            selectedItems : temp, 
        });
    };

    handleClickOpen = () => {
        console.log("handleClickOpen");
        fetch('http://localhost:4000/products')
        .then(response => response.json())
        .then(json => {
            console.log(json.data);
            this.setState({ queriedItems : json.data, resultModalOpen:true });
        });
    };
    
    handleClose = value => {
        console.log("Closed");
        console.log(value);
        var temp = this.state.selectedItems.slice();
        temp.push(value);
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
        console.log("Button clicked");
        localStorage.setItem('key', this.state.text);
    }

    onChange(event){
        console.log("Change " + event.target.value);
        this.setState({
            text : event.target.value,
        });
    }

    render() {
        return (
        <Layout user={this.state.user.user}>
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
                <div style={{ maxHeight: 300 , width : 360}}>
                    Selected Items :  
                    <List>
                    {this.state.selectedItems.map( item => {
                        return(
                            <ListItem key={item.productID}>
                              <ListItemAvatar>
                                <Avatar>
                                    {item.productID}
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={item.productName}
                                secondary={item.productPrice}
                              />
                              <ListItemSecondaryAction>
                                <Button color="secondary" onClick={() => this.removeFromList(item)}>X</Button>    
                              </ListItemSecondaryAction>
                            </ListItem>
                        )
                    },this)}
                    </List>  
                </div>
                <Button color="primary" onClick={() => console.log("Finalize")}>FINALIZE</Button>  
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
