import React, { Component } from 'react';
import Layout from '../components/Layout';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography, Grid, Paper } from '@material-ui/core';

class Index extends Component {
    constructor(props){
        super(props)
        this.state = {
            text : '',
            prevText : '',
        };
    }


    componentDidMount(){
        const data = localStorage.getItem('key');
        this.setState({ text : data });
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
        <Layout>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="stretch"
                spacing={40}
                >
                <Grid item md={12}>
                    <Typography variant="display3" style={{textAlign : 'center'}}>
                        PRICE CHEKER PROGRAM
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
                                <Button variant="contained" onClick={this.handleClick.bind(this)}>Search</Button>
                            </Grid>
                            <Grid item md = {2}>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

            <div className="container">
                <p>Search string: {this.state.text}</p>
            </div>
        </Layout>
        );
    }
}

export default Index;
