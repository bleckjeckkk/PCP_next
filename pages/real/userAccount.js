import React, { Component } from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { Typography, Grid, Paper, Snackbar, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, Collapse } from '@material-ui/core'

import Router from 'next/router'
import Layout from '../../components/Layout'
import { PCP_SERVER } from '../../res/ImportantThings'

import FormWrapper from '../../components/Form'
import SnackbarWrapper from '../../components/Snackbar'

const CHAR_LIMIT = 120;

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

class Index extends Component {
    queue = [];

    constructor(props){
        super(props)
        this.state = {
            feedback : '',
            text : '',
            user : { user : {}},
            snackbarMode : '',
            snackbarMessage : '',
            open : false,
            formOpen : false,
            usr : {},
            favItemsParsed : [],
        };
    }

    componentDidMount(){
        this.getLatestInfo();
        this.getMaxID();
    }

    getLatestInfo(){
        var user = window.sessionStorage.getItem('info');
        var usr = {};
        if (user === null){
            user = { user : {}}
        }else{
            user = JSON.parse(user);
            fetch(`${PCP_SERVER}/users/info?id=${user.user.id}`)
            .then(response => response.json())
            .then(response => {
                usr = response.user;
                this.getProducts(JSON.parse(response.user.favItems));
                this.setState({ 
                    favItems : response.user.favItems,
                    usr,
                    user,
                });
            });
        }
    }

    getProducts(items){
        fetch(`${PCP_SERVER}/products/getProducts?products=${JSON.stringify(items)}`)
        .then(response => response.json())
        .then(response => {
            this.setState({
                favItemsParsed : response.res,
            });
        });
    }

    getMaxID(){
        fetch(`${PCP_SERVER}/feedbacks/getCount`)
        .then(response => response.json())
        .then(json => {
            const next = json.res[0].count + 1;
            this.setState({ lastFeedbackID : next});
        });
    }

    onFeedbackChange(event){
        this.setState({
            feedback : event.target.value,
        });
    }

    onChange(event){
        this.setState({
            text : event.target.value,
        });
    }

    handleFormOpen = (userUpdate, value) => {
      switch(userUpdate){
        case 'firstName': this.setState({
                                        formOpen : true,
                                        text : value,
                                        attribute : userUpdate
                                        });
                                        break;
        case 'lastName': this.setState({
                                        formOpen : true,
                                        text : value,
                                        attribute : userUpdate
                                      });
                                      break;
        case 'username': this.setState({
                                        formOpen : true,
                                        text : value,
                                        attribute : userUpdate
                                      });
                                      break;
      }
    };

    handleFormClose = () => {
        this.setState({ formOpen: false });
    };

    logout(){
        Router.push('/login')
        .then(() => {
            window.sessionStorage.setItem("info", JSON.stringify({}));
        });
    }

    updateUser(){
        this.showSnackbar('info','Updating entry...');
        this.handleFormClose();
        const {user} = this.state.user;
        var u = {
          id : user.id
        };
        switch(this.state.attribute){
          case 'firstName': u = {
                                    id:user.id,
                                    firstName : this.state.text,
                                    lastName : user.lastName,
                                    username: user.userName
                                }
                                break;
          case 'lastName': u = {
                                    id:user.id,
                                    firstName : user.firstName,
                                    lastName : this.state.text,
                                    username: user.userName
                                }
                                break;
          case 'username': u = {
                                    id:user.id,
                                    firstName : user.firstName,
                                    lastName : user.lastName,
                                    username: this.state.text
                                }
                                break;
        }
        fetch(`${PCP_SERVER}/users/update?userID=${u.id}&firstName=${u.firstName}&lastName=${u.lastName}&userName=${u.username}`)
        .then(response => response.json())
        .then(response => {
          if(response.msg == 'success'){
            this.showSnackbar('success', 'Information Updated. Log out to apply changes.');
          }else{
            this.showSnackbar('error','An error occured. Please try again.');
            console.error(response.res);
          }
        })
        .catch((e)=> {
            this.showSnackbar('error','An error occured. Please try again.');
            console.error(e);
        })
        this.setState({text : ''});
        switch(this.state.attribute){
          case 'username' : this.logout();
                                         break;
          default : break;
        }
    }

    sendFeedback(){
        if(this.state.feedback.length > CHAR_LIMIT){
            this.showSnackbar('error', `Message exceeded ${CHAR_LIMIT} characters!`);
            return;
        }
        this.showSnackbar('info', 'Sending Feedback');
        fetch(`${PCP_SERVER}/feedbacks/add?feedbackID=${this.state.lastFeedbackID}&userID=${this.state.user.user.id}&feedbackContent=${this.state.feedback}`)
        .then(response => response.json())
        .then(response => {
            if(response.msg == 'success'){
                this.showSnackbar('success', 'Feedback sent! Thank you.');
                this.setState({ feedback : '' });
            }else{
                this.showSnackbar('error', `Error ${response.res.code}`);
                this.setState({ feedback : '' });
            }
            this.getMaxID();
        })
        .catch(err => {console.error(err);})

    }

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

    removeFromList = (product) => {
        var temp = this.state.favItemsParsed.slice();
        const index = temp.indexOf(product);
        temp.splice(index,1);
        this.setState({
            favItemsParsed : temp, 
        });
    };

    render() {
        return (
        <Layout user={this.state.user.user}>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="stretch"
                spacing={0}
                >
                <Grid item xs={12}>
                    <Paper elevation={5} style={{ backgroundColor : `rgba(255,255,255,0.8)`  }}>
                        <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item sm={2} xs={12}>
                                <Grid container
                                    justify="center"
                                    alignItems="center"
                                >
                                    <img src="static/user.png" />
                                </Grid>
                            </Grid>
                            <Grid item sm={10} xs={12}>
                                <Grid container
                                    direction="column"
                                    justify="center"
                                    alignItems="stretch"
                                    style={{ padding : 20 }}
                                >
                                    <Grid item xs={12}>
                                        <Typography variant="display2">
                                            {`${this.state.usr.firstName} ${this.state.usr.lastName}`}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container
                                            direction="row"
                                            justify="space-around"
                                            alignItems="center"
                                            style={{ padding : 20 }}
                                        >
                                            <Button variant="contained" onClick={() => this.handleFormOpen('firstName', this.state.usr.firstName)}>{this.state.usr.firstName}</Button>
                                            <Button variant="contained" onClick={() => this.handleFormOpen('lastName', this.state.usr.lastName)}>{this.state.usr.lastName}</Button>
                                            <Button variant="contained" onClick={() => this.handleFormOpen('username', this.state.usr.userName)}>{this.state.usr.userName}</Button>
                                            <Button variant="contained" color="secondary" onClick={() => this.logout()}> Log Out </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="flex-start"
                        style={{ padding : 20 }}
                    >
                        <Grid item md={5}>
                            <Paper elevation={5} style={{ padding : 20, backgroundColor : `rgba(255,255,255,0.8)` }}>
                                <Grid container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                    spacing={16}
                                    >
                                    <Grid item>
                                        <Typography variant="display1">
                                            FAVORITE LIST
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Collapse in={!isEmpty(this.state.favItemsParsed)}>
                                            <div style={{ height : 300 , width : 300}}>
                                                <Paper style={{ maxHeight : 200  , overflowY : 'auto' , padding : 20}}>
                                                    <List style={{ maxHeight : 200 }}>
                                                    {this.state.favItemsParsed.map( item => {
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
                                            </div>
                                        </Collapse>
                                    </Grid>
                                    <Grid item>
                                        <Grid container
                                            direction="row"
                                            spacing={16}
                                            >
                                            <Grid item>
                                                <Button variant="contained" 
                                                    disabled={isEmpty(this.state.favItemsParsed)}
                                                    onClick={() => {
                                                        const temp = this.state.favItemsParsed.slice();
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
                                                    }}>
                                                    SAVE
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Button variant="contained" 
                                                    disabled={isEmpty(this.state.favItemsParsed)}
                                                    onClick={() => {
                                                        const temp = this.state.favItemsParsed.slice();
                                                        var items = [];
                                                        temp.map( (item) => {
                                                            items.push(item.p_ID);
                                                        });
                                                        localStorage.setItem('selectedItems', JSON.stringify(items));
                                                        Router.push('/compare');
                                                    }}>
                                                    COMPARE
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item md={1}>
                            <span></span>
                        </Grid>
                        <Grid item md={6}>
                            <Paper elevation={5} style={{ padding : 20, backgroundColor:`rgba(255,255,255,0.8)`}}>
                                <Grid container
                                    direction="column"
                                    justify="center"
                                    alignItems="stretch"
                                    >
                                    <Typography variant="display1" align="center">
                                        FEEDBACK
                                    </Typography>
                                    <TextField
                                        error={this.state.feedback.length > CHAR_LIMIT}
                                        id="feedbackText"
                                        value={this.state.feedback}
                                        onChange={this.onFeedbackChange.bind(this)}
                                        multiline
                                        rowsMax="8"
                                        margin="normal"
                                        fullwidth
                                        helperText={`${this.state.feedback.length}/${CHAR_LIMIT}`}
                                    />
                                    <Button variant="contained" onClick={() => this.sendFeedback()}>SEND FEEDBACK</Button>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <FormWrapper
                isOpen={this.state.formOpen}
                onClose={this.handleFormClose}
                title='user Form'
                subtitle={`Enter new ${this.state.attribute}`}
                acceptFunction= {() => this.updateUser()}
                acceptText= "Update"
                >
                <TextField
                    margin="dense"
                    id="txtBox"
                    label={this.state.attribute}
                    fullWidth
                    onChange={this.onChange.bind(this)}
                    value={this.state.text}
                />
            </FormWrapper>

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

export default Index;
