import React, { Component } from 'react'
import { Grid, Typography, Paper } from '@material-ui/core'

import Layout from '../../components/Layout.js'

class About extends Component{
    constructor(props){
        super(props);
        this.state = {
            user : { user : {}}
        };
    }

    componentDidMount(){
        var user = window.sessionStorage.getItem('info');
        if (user === null){
            user = { user : {}}
        }else{
            user = JSON.parse(user);
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
    }

    render(){
        return(
        <Layout user={this.state.user.user} page="About">
            <Paper style={{padding : 20 , backgroundColor : `rgba(255,255,255,0.8)`}}>
                <Grid container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={16}>
                    <Grid item xs={12}>
                        <Typography variant="display3">
                            About PCP
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="body2">
                            Every month, one’s family may have that day—the day for going to the store/supermarket to buy groceries. We always want to get the best products for the best price. To have a “bang for our buck” on the things we buy. But as the prices of commodities continue to rise, so does our cautiousness on what we buy, even on what supermarket we want to buy those commodities from. And this is where the Price Check Program comes in. 
                        </Typography>   
                        <Typography variant="body2">
                            The Price Check Program is a program that can help you in your decisions on where to buy your commodities. You only need to search for the product(s) you want, and you can see the difference in the total price from various supermarkets added in the database. We also aim to be as accurate as possible; so users can send feedback in case of incorrect prices, availabilities, and other information of products. 
                        </Typography>   
                    
                    </Grid>
                </Grid>
            </Paper>
        </Layout>
        );
    }
}
export default About;