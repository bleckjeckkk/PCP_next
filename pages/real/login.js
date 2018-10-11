import React, { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Layout from '../../components/Layout'
import SnackbarWrapper from '../../components/Snackbar'
import {
    Paper,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    Grid,
    Snackbar,
    IconButton,
    Tooltip,
} from '@material-ui/core'

import { PCP_SERVER } from '../../res/ImportantThings'

class Login extends Component {

    queue = [];

    constructor(props){
        super(props)
        this.state = {
            fName : '',
            lName : '',
            login_username : '',
            signin_username : '',
            login_password : '',
            signin_password : '',
            adminRoute: '',
            adminRoute: '',
            willAuth: false,
            lastUserID : -1,
            open : false,
            isAdmin : false,
            auth : false,
            snackbarMessage : '',
            snackbarMode : '',
            notUnique : false,
        };
    }

    componentDidMount(){
        this.getMaxID();
    }

    getMaxID(){
        fetch(`${PCP_SERVER}/users/getCount`)
        .then(response => response.json())
        .then(json => {
            const next = json.res[0].count + 1;
            this.setState({ lastUserID : next});
        });
    }

    onChange(event){
        this.setState({ [event.target.id] : event.target.value });
    }

    auth(){
        this.showSnackbar('info',"Logging in...");

        const credentials = { username : this.state.login_username , password : this.state.login_password };

        fetch(`${PCP_SERVER}/users/auth?userName=${credentials.username}&userPassword=${credentials.password}`)
        .then(response => response.json())
        .then(response => {
            if(response.auth){
                if(response.admin){
                    const info = {
                        admin : true,
                        auth : true,
                        user : response.user,
                    }
                    this.showSnackbar('success',`Welcome, ${info.user.userName}`)
                    setTimeout(() => {
                        Router.replace('/admin/adminHome')
                        .then(() => {
                            window.sessionStorage.setItem("info", JSON.stringify(info));
                        });
                    },1500);
                }else{
                    const info = {
                        admin : false,
                        auth : true,
                        user : response.user,
                    }
                    this.showSnackbar('success',`Welcome, ${info.user.userName}`)
                    setTimeout(()=>{
                        window.sessionStorage.setItem("info", JSON.stringify(info));
                        Router.push('/userAccount');
                    },1500);
                }
            }else{
                setTimeout(()=>{
                    this.showSnackbar('error',"You have inputted the wrong username/password. Try again.");
                },1000);
            }
        })
        .catch(err => console.error(err))
    }

    signup(){
        this.showSnackbar('info',"Registering user...");

        const credentials = {
            firstName : this.state.fName,
            lastName : this.state.lName,
            username : this.state.signin_username,
            password : this.state.signin_password,
        };

        if(credentials.firstName == '' || credentials.lastName == '' || credentials.username == '' || credentials.password ==''){
            this.showSnackbar('error',"Please input missing fields.");
            if(credentials.firstName == ''){
                this.setState({ firstNameMissing : true});
            }else{
                this.setState({ firstNameMissing : false});
            }
            if(credentials.lastName == ''){
                this.setState({ lastNameMissing : true});
            }else{
                this.setState({ lastNameMissing : false});
            }
            if(credentials.username == ''){
                this.setState({ usernameMissing : true});
            }else{
                this.setState({ usernameMissing : false});
            }
            if(credentials.password == ''){
                this.setState({ passwordMissing : true});
            }else{
                this.setState({ passwordMissing : false});
            }
            return;
        }
        fetch(`${PCP_SERVER}/users/check?userName=${credentials.username}`)
        .then(response => response.json())
        .then(response => {
            if(response.unique){
                this.addUser(credentials);
            }else{
                setTimeout(()=>{
                    this.setState({
                        notUnique : true,
                    });
                    this.showSnackbar('error',"This username already exists. Please try another one.");
                },750);
            }
        })
        .catch(err => console.error(err));
    }

    addUser = (credentials) => {
        const fName  = credentials.firstName;
        const lName = credentials.lastName;
        const username = credentials.username;
        const password = credentials.password;
        const uID = this.state.lastUserID;

        fetch(`${PCP_SERVER}/users/add?userID=${uID}&userName=${username}&userPassword=${password}&lastName=${lName}&firstName=${fName}`)
        .then(response => response.json())
        .then(response => {
            if(response.msg === 'success'){
                this.showSnackbar('success',"User Successfully Registered!");
                this.setState({
                    signin_username : '',
                    signin_password : '',
                    fName : '',
                    lName : '',
                    notUnique : false,
                    usernameMissing : false,
                    passwordMissing : false,
                    firstNameMissing : false,
                    lastNameMissing : false
                });
                this.getMaxID();
            }else{
                this.showSnackbar('error',"Error: something happened.");
                console.log(response.res);
            }
        })
        .catch(err => console.error(err))
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
        <Layout page="Login">
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="stretch"
                >
                {/*Login form*/}
                <Grid item xs={12}>
                    <Paper style={{padding : 20, backgroundColor : `rgba(255,255,255,0.8)`}}>
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                            spacing={16}
                        >
                            <Grid item>
                                <TextField
                                    id="login_username"
                                    label="User Name"
                                    value={this.state.login_username}
                                    onChange={this.onChange.bind(this)}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="login_password"
                                    label="Password"
                                    value={this.state.login_password}
                                    onChange={this.onChange.bind(this)}
                                    margin="normal"
                                    type="password"
                                />
                            </Grid>
                            <Grid item>
                                    <Button id="login-btn" variant="contained" onClick={this.auth.bind(this)}>Login</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                {/*Sign Up form*/}
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    style={{ padding : 20 }}>
                    <Grid item xs = {12} md={6}>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                            >
                            <img src="static/shpCart.png" />
                        </Grid>
                    </Grid>
                    <Grid item xs = {12} md= {6}>
                        <Paper style={{padding : 20, backgroundColor : `rgba(255,255,255,0.8)`}}>
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                alignItems="center"
                                spacing={8}
                            >
                                <Typography variant="display2">
                                    Sign Up
                                </Typography>
                                <Grid item>
                                    <TextField
                                        error={this.state.firstNameMissing}
                                        id="fName"
                                        label="First Name"
                                        value={this.state.fName}
                                        onChange={this.onChange.bind(this)}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        error={this.state.lastNameMissing}
                                        id="lName"
                                        label="Last Name"
                                        value={this.state.lName}
                                        onChange={this.onChange.bind(this)}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        error={this.state.notUnique || this.state.usernameMissing}
                                        id="signin_username"
                                        label="User Name"
                                        value={this.state.signin_username}
                                        onChange={this.onChange.bind(this)}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        error={this.state.passwordMissing}
                                        id="signin_password"
                                        label="Password"
                                        value={this.state.signin_password}
                                        onChange={this.onChange.bind(this)}
                                        margin="normal"
                                        type="password"
                                    />
                                </Grid>
                                <Grid item>
                                    <Button id="register-btn" variant="contained" onClick={this.signup.bind(this)}>Register</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
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

export default Login;
