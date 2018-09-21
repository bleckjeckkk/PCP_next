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
    Popover,
    Tooltip,
    Snackbar,
} from '@material-ui/core';

import Router from 'next/router'

import SnackbarWrapper from '../../components/Snackbar'
import ProductDialog from '../../components/ProductDialog'
import Layout from '../../components/Layout'

import { PCP_SERVER } from '../../res/ImportantThings'

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

class Home extends Component {

    queue = [];

    constructor(props){
        super(props);
        this.state = {
            text : '',
            prevText : '',
            user : { user : {}},
            resultModalOpen: false,
            queriedItems : [],
            selectedItems : [],
        };
    }
  
// SNACKBAR THINGS
    showSnackbar(mode, message){
        this.queue.push({
            message,
            mode,
            key: new Date().getTime(),
        });

        if (this.state.open) {
        this.setState({ open: false });
        } else {
        this.processQueue();
        }
    }

    processQueue = () => {
        if (this.queue.length > 0) {
        const msg = this.queue.shift();
        this.setState({
            snackbarMessage: msg.message,
            snackbarMode : msg.mode,
            open: true,
        });
        }
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        this.setState({ open: false });
    };

    handleExited = () => {
        this.processQueue();
    };

// END OF SNACKBAR THINGS
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
        fetch(`${PCP_SERVER}/products/find?productName=${this.state.text}`)
        .then(response => response.json())
        .then(json => {
            this.setState({ queriedItems : json.res, resultModalOpen:true });
        });
    };
    
    handleDialogClose = value => {
        if(isEmpty(value)){
            this.setState({
                resultModalOpen: false,
                text : ''
            });
            return;
        }
        var temp = this.state.selectedItems.slice();
        var found = temp.some(function (prod) {
            return (prod.p_ID === value.p_ID) || (prod.matched_ID === value.p_ID);
        });
        if(!found){
            temp.push(value);
        }else{
            this.showSnackbar('error','The product (or equivalent) is already in your list.');
        }
        this.setState({
            resultModalOpen: false,
            selectedItems : temp,
            text : ''
        });
    };

    componentDidMount(){
        var user = window.sessionStorage.getItem('info');
        if (user === null){
            user = { user : {}}
        }else{
            user = JSON.parse(user);
            console.log({user});
            if(user.admin){
                user = {
                    ...user,
                    user: {
                        ...user.user,
                        admin : user.admin,
                    }
                }
            }
        }
        this.setState({ user });
        console.log({user});
        Router.prefetch('/compare');
    }

    handleClick(){
        localStorage.setItem('key', this.state.text);
    }

    onChange(event){
        this.setState({
            text : event.target.value,
        });
    }

    saveListLocal(){
        const temp = this.state.selectedItems.slice();
        var items = [];
        temp.map( (item) => {
            items.push(item.p_ID);
        });
        localStorage.setItem('selectedItems', JSON.stringify(items));
    }

    saveList(){
        const temp = this.state.selectedItems.slice();
        var items = [];
        temp.map( (item) => {
            items.push(item.p_ID);
        });
        fetch(`${PCP_SERVER}/users/updateFav?userID=${this.state.user.user.id}&favItems=${JSON.stringify(items)}`)
        .then(response => response.json())
        .then(response => {
            if(response.msg == 'success'){
                this.showSnackbar('success','List Saved!');
            }
        });
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
                    <Paper style={{padding : 20, backgroundColor : `rgba(255,255,255,0.8)`}}>
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
                                <Button variant="contained" onClick={() => this.handleClickOpen()}>Search</Button>
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
                                    <Grid item md={6}>
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
                                        <Button color="primary" variant="contained" 
                                            onClick={() => {
                                                this.saveListLocal();
                                                Router.push('/compare');
                                            }}>
                                            COMPARE
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        {isEmpty(this.state.user) ? (
                                            <div>
                                                <Tooltip disableFocusListener disableTouchListener title="You need to be logged in to use this feature"> 
                                                    <span>
                                                        <Button disabled color="primary" variant="contained">
                                                            SAVE
                                                        </Button>
                                                    </span>
                                                </Tooltip>
                                            </div>
                                            ) : (
                                                <Button color="primary" variant="contained" onClick={() => this.saveList()}>SAVE</Button>
                                            )
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Collapse>
                </Grid>
            </Grid>
            <ProductDialog
                open={this.state.resultModalOpen}
                onClose={this.handleDialogClose}
                items={this.state.queriedItems}
                showSupermarket={true}
            />
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.state.open}
                autoHideDuration={6000}
                onClose={this.handleClose}
                onExited={this.handleExited}
                >
                <SnackbarWrapper
                    variant={this.state.snackbarMode}
                    message={this.state.snackbarMessage}
                    onClose={this.handleClose}
                />
            </Snackbar>
        </Layout>
        );
    }
}

export default Home;
