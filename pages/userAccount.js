import React, { Component } from 'react';
import Layout from '../components/Layout';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography, Grid, Paper } from '@material-ui/core';

import Router from 'next/router'

class Index extends Component {
    constructor(props){
        super(props)
        this.state = {
            text : '',
            user : { user : {}}
        };
    }

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

    logout(){
        const info = {};
        window.sessionStorage.setItem("info", JSON.stringify(info));
        Router.push('/login');
    }
    render() {
        return (
        <Layout user={this.state.user.user}>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="stretch"
                spacing={8}
                >
                <Grid item md={12}>
                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        style={{ padding : 20 }}
                    >
                        <Grid item md={2}>
                            <Grid container
                                justify="center"
                                alignItems="center"
                            >
                                Photo Here
                            </Grid>
                        </Grid>
                        <Grid item md={10}>
                            <Grid container
                                direction="column"
                                justify="center"
                                alignItems="stretch"
                                style={{ padding : 20 }}
                            >
                                <Grid item>
                                    <Typography variant="display2">
                                        User Account
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Grid container
                                        direction="row"
                                        justify="space-around"
                                        alignItems="center"
                                        style={{ padding : 20 }}
                                    >
                                        <Button variant="contained">{this.state.user.user.firstName}</Button> 
                                        <Button variant="contained">{this.state.user.user.lastName}</Button> 
                                        <Button variant="contained">{this.state.user.user.userName}</Button>  
                                        <Button variant="contained" color="secondary" onClick={() => this.logout()}> Log Out </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={12}>
                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="flex-start"
                        style={{ padding : 20 }}
                    >
                        <Grid item md={5}>
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
                        </Grid>
                        <Grid item md={1}>
                            <span></span>
                        </Grid>
                        <Grid item md={6}>
                            <Grid container
                                direction="column"
                                justify="center"
                                alignItems="stretch"
                            >
                                <Typography variant="display1" align="center">
                                    FEEDBACK
                                </Typography>
                                <TextField
                                    id="feedbackText"
                                    value={this.state.text}
                                    onChange={this.onChange.bind(this)}
                                    multiline
                                    rowsMax="8"
                                    margin="normal"
                                    fullwidth
                                />
                                <Button variant="contained">SEND FEEDBACK</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={12}>
                    <Grid container
                        direction="column"
                        justify="flex-end"
                        alignItems="center"
                    >
                    </Grid>
                </Grid>
            </Grid>
        </Layout>
        );
    }
}

export default Index;
