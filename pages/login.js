import React, { Component } from 'react';

// import {
//     Redirect,
//     Link
//   } from 'react-router-dom'

import Layout from '../components/Layout'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
        // fetch('http://localhost:4000/users/getCount')
        // .then(response => response.json())
        // .then(json => console.log(json));
        //depending on the console.log, 
        //update state.lastUserID by adding the result of getCount by 1
    }

    onChange(event){
        switch(event.target.id){
            case 'login_username' : this.setState({ login_username : event.target.value}); break;
            case 'login_password' : this.setState({ login_password : event.target.value}); break;
            case 'signin_username' : this.setState({ signin_username : event.target.value}); break;
            case 'signin_password' : this.setState({ signin_password : event.target.value}); break;
            case 'fName' : this.setState({ fName : event.target.value}); break;
            case 'lName' : this.setState({ lName : event.target.value}); break;
            default : console.log("this wasn't supposed to happen."); break;
        }
        this.setState({willAuth : true})
        console.log(event.target);
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
            <div class="container">
                <div class="column">
                    <div class="row" horizontal='start'>
                        <div class="card">
                        <div style={{width : 750}}>
                        <div class="cardcontent">
                            <div class="row" vertical='center' horizontal="space-around" flexGrow={1} >
                                <div class="column">
                                    <div class="column">
                                        <TextField
                                            id="login_username"
                                            label="User Name"
                                            value={this.state.login_username}
                                            onChange={this.onChange.bind(this)}
                                            margin="normal"
                                        />
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="column">
                                        <TextField
                                            id="login_password"
                                            label="Password"
                                            value={this.state.login_password}
                                            onChange={this.onChange.bind(this)}
                                            margin="normal"
                                            type="password"
                                        />
                                    </div>
                                </div>
                                <div class="column">
                                    {/* <Link to={this.state.adminRoute}> */}
                                        <Button variant="contained" onClick={this.login.bind(this)} onPointerEnter={this.auth.bind(this)}>Login</Button>
                                    {/* </Link> */}
                                </div>
                            </div>
                        </div>
                        </div>
                        </div>
                    </div>

                    <div class="row" horizontal='around' flexGrow={1}>
                        <div class="column" flexGrow={.5}>
                            <div>
                                
                            </div>
                        </div>
                        
                        <div class="column" flexGrow={.5} horizontal='center'>
                            <div class="row">   
                            <div>
                            <div class="card">
                                <div class="cardcontent">
                                        <div class="row" flexGrow={1}>
                                            <h1>Sign Up</h1>
                                        </div>
                                        <div class="row" flexGrow={1}>
                                            <div>
                                                <TextField
                                                    id="fName"
                                                    label="First Name"
                                                    value={this.state.fName}
                                                    onChange={this.onChange.bind(this)}
                                                    margin="normal"
                                                />
                                            </div>
                                        </div>
                                        <div class="row" flexGrow={1}>
                                            <div>
                                                <TextField
                                                    id="lName"
                                                    label="Last Name"
                                                    value={this.state.lName}
                                                    onChange={this.onChange.bind(this)}
                                                    margin="normal"
                                                />
                                            </div>
                                        </div>
                                        <div class="row" flexGrow={1}>
                                        <div>
                                        <TextField
                                            id="signin_username"
                                            label="User Name"
                                            value={this.state.signin_username}
                                            onChange={this.onChange.bind(this)}
                                            margin="normal"
                                        />
                                        </div>
                                        </div>
                                        <div class="row" flexGrow={1}>
                                        <TextField
                                            id="signin_password"
                                            label="Password"
                                            value={this.state.signin_password}
                                            onChange={this.onChange.bind(this)}
                                            margin="normal"
                                            type="password"
                                        />
                                        </div>
                                        <Button variant="contained" onClick={this.signup.bind(this)}>Signup</Button>
                                </div>
                            </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
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
