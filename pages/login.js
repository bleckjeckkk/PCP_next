import React, { Component } from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
import Router from 'next/router'
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
} from '@material-ui/core'

class Login extends Component {
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
            snackbarMessage : 'hello world!',
        };
    }

    componentDidMount(){
        console.log("componentWillMount");
        this.getMaxID();
    }

    getMaxID(){
        console.log("getMaxID");
        fetch('http://localhost:4000/users/getCount')
        .then(response => response.json())
        .then(json => {
            const next = json.data[0].count + 1;
            this.setState({ lastUserID : next});
        });
    }

    onChange(event){
        this.setState({ [event.target.id] : event.target.value });
        this.setState({willAuth : true})
    }

    auth(){
        this.setState({ 
            open : true,
            snackbarMessage : 'Logging in...',
        });
        console.log("auth");

        const credentials = { username : this.state.login_username , password : this.state.login_password };

        console.log(credentials);
        fetch(`http://localhost:4000/users/auth?userName=${credentials.username}&userPassword=${credentials.password}`)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            if(response.auth){
                if(response.admin){
                    console.log("---admin---");
                    const info = {
                        admin : true,
                        auth : true,
                        user : response.user,
                     }
                    window.sessionStorage.setItem("info", JSON.stringify(info));
                    setTimeout(() => {
                        Router.replace('/admin/adminHome');
                    },1500);
                }else{
                    console.log("---not admin---");
                    const info = {
                        admin : false,
                        auth : true,
                        user : response.user,
                     }
                    window.sessionStorage.setItem("info", JSON.stringify(info));
                    setTimeout(()=>{
                        Router.push('/userAccount');
                    },1500);
                }
            }else{
                this.setState({ 
                    open : true,
                    snackbarMessage : 'You have inputted the wrong username/password. Try again.',
                });
            }
        })
        .catch(err => console.error(err))
    }

    login(){
        console.log("button pressed!");

        const credentials = { username : this.state.login_username , password : this.state.login_password };

        if(this.state.isAdmin){
            this.setState({ open : true });
        }
        console.log(credentials);
    }

    signup(){
        console.log("signup button pressed!");
        const credentials = { 
            firstName : this.state.fName,
            lastName : this.state.lName,
            username : this.state.signin_username,
            password : this.state.signin_password,
        };
        this.addUser(credentials);
    }

    addUser = (credentials) => {
        console.log("addUser");
        const fName  = credentials.firstName;
        const lName = credentials.lastName;
        const username = credentials.username;
        const password = credentials.password;
        const uID = this.state.lastUserID;

        fetch(`http://localhost:4000/users/add?userID=${uID}&userName=${username}&userPassword=${password}&lastName=${lName}&firstName=${fName}`)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err))
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({ open: false });
    };

    render() {
        return (
        <Layout>
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="stretch"
                >
                {/*Login form*/}
                <Grid item xs={12}>
                    <Paper style={{padding: 20}}>
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
                                    <Button variant="contained" onClick={this.auth.bind(this)}>Login</Button> 
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
                    <Grid item xs = {6}>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                            > 
                            picture of a shopping cart here
                        </Grid>
                    </Grid>
                    <Grid item xs = {6}>
                        <Paper style={{padding : 20}}>
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
                                        id="fName"
                                        label="First Name"
                                        value={this.state.fName}
                                        onChange={this.onChange.bind(this)}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="lName"
                                        label="Last Name"
                                        value={this.state.lName}
                                        onChange={this.onChange.bind(this)}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="signin_username"
                                        label="User Name"
                                        value={this.state.signin_username}
                                        onChange={this.onChange.bind(this)}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="signin_password"
                                        label="Password"
                                        value={this.state.signin_password}
                                        onChange={this.onChange.bind(this)}
                                        margin="normal"
                                        type="password"
                                    />
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" onClick={this.signup.bind(this)}>Register</Button>
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
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{this.state.snackbarMessage}</span>}
                action={[
                    <Button
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={this.handleClose}
                    >
                        CLOSE
                    </Button>,
                ]}
            />
        </Layout>
        );
    }
}

export default Login;
