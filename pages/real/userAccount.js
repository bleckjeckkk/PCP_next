import React, { Component } from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { Typography, Grid, Paper, Snackbar } from '@material-ui/core'

import Router from 'next/router'
import Layout from '../../components/Layout'
import { PCP_SERVER } from '../../res/ImportantThings'

import FormWrapper from '../../components/Form'
import SnackbarWrapper from '../../components/Snackbar'

const CHAR_LIMIT = 120;

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
            formOpen : false
        };
    }

    componentDidMount(){
        var user = window.sessionStorage.getItem('info');
        if (user === null){
            user = { user : {}}
        }else{
            user = JSON.parse(user)
        }
        this.getMaxID();
        this.setState({ user });
        console.log({user});
    }

    getMaxID(){
        fetch(`${PCP_SERVER}/feedbacks/getCount`)
        .then(response => response.json())
        .then(json => {
            const next = json.res[0].count + 1;
            this.setState({ lastFeedbackID : next});
            console.log(next);
        });
    }

    handleClick(){
        localStorage.setItem('key', this.state.text);
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
      console.log({userUpdate, value});
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
        console.log({user});
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
        console.log({u});
        fetch(`${PCP_SERVER}/users/update?userID=${u.id}&firstName=${u.firstName}&lastName=${u.lastName}&userName=${u.username}`)
        .then(response => response.json())
        .then(response => {
          console.log({response});
          if(response.msg == 'success'){
            this.showSnackbar('success', 'Entry updated');
          }else{
            this.showSnackbar('error','An error occured. Please try again.');
            console.error(response.res);
          }
        })
        .catch((e)=> console.log(e))
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
        fetch(`${PCP_SERVER}/feedbacks/add?feedbackID=${this.state.lastFeedbackID}&userID=${this.state.user.user.id}&productName=${this.state.feedback}&productID=0
        `)
        .then(response => response.json())
        .then(response => {
            if(response.msg == 'success'){
                this.showSnackbar('success', 'Feedback sent! Thank you.');
                this.setState({ feedback : '' });
            }else{
                this.showSnackbar('error', `Error ${response.res.code}`);
                this.setState({ feedback : '' });
            }
            console.log(response);
            this.getMaxID();
        })
        .catch(err => {console.log(err);})

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
                                    Photo Here
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
                                            User Account
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container
                                            direction="row"
                                            justify="space-around"
                                            alignItems="center"
                                            style={{ padding : 20 }}
                                        >
                                            <Button variant="contained" onClick={() => this.handleFormOpen('firstName', this.state.user.user.firstName)}>{this.state.user.user.firstName}</Button>
                                            <Button variant="contained" onClick={() => this.handleFormOpen('lastName', this.state.user.user.lastName)}>{this.state.user.user.lastName}</Button>
                                            <Button variant="contained" onClick={() => this.handleFormOpen('username', this.state.user.user.userName)}>{this.state.user.user.userName}</Button>
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
                                    >
                                    <Typography variant="display1">
                                        FAVORITE LIST
                                    </Typography>
                                    <Typography variant="display1">
                                    <div style={{ height : 300 , width : 300}}>
                                        TABLE HERE
                                    </div>
                                    </Typography>
                                    <Button variant="contained">Compare</Button>
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
