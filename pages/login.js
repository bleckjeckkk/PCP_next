import React, { Component } from 'react';
import Layout from '../components/Layout'

import { 
    Paper, 
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    Grid 
} from '@material-ui/core';

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
            willAuth: false,
            lastUserID : -1,
        };
    }

    componentWillMount(){
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
        console.log("auth");

        const credentials = { username : this.state.login_username , password : this.state.login_password };

        if(this.state.willAuth){
            if(credentials.username === "admin"){
                console.log("---admin---");
                this.setState({
                    adminRoute: '/admin/home',
                })
            }else{
                console.log("---not admin---");
                this.setState({
                    adminRoute: '',
                })
            }
            this.setState({willAuth : false});
        }

        console.log(credentials);
    }

    login(){
        console.log("button pressed!");

        const credentials = { username : this.state.login_username , password : this.state.login_password };

        if(credentials.username === "admin"){
            console.log("admin");
        }else{
            console.log("not admin");
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
                                <Button variant="contained" onClick={this.login.bind(this)} onPointerEnter={this.auth.bind(this)}>Login</Button> 
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
        </Layout>
        );
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
    
}

export default Login;
