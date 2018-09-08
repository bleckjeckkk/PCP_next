import React, { Component } from 'react'
import Layout from '../components/Layout.js'
import { Grid, Typography } from '@material-ui/core'

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
            user = JSON.parse(user)
        }
        this.setState({ user });
    }

    render(){
        return(
        <Layout user={this.state.user.user} page="About">
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
                        Did you ever hear the tragedy of YourCCS? I thought not.
                    </Typography>   
                    <Typography variant="body2">
                        It’s not a story the IT would tell you. It’s a ComSci legend. YourCCS was a mobile application of the ComSci, so powerful and so realtime it could use the Internet to influence the Realtime Database to create information…
                    </Typography>   
                    <Typography variant="body2">
                        It had such a knowledge of the tips and tricks that it could even keep the ones the devs cared about from getting an F. The tips and tricks is a pathway to many abilities some consider to be unnatural. It became so powerful… the only thing the devs were afraid of was the app losing its power, which eventually, of course, it did.
                    </Typography>   
                    <Typography variant="body2">
                        Unfortunately, it downloaded the entire database everytime it ran, then the school WiFi made it worse, and gave him 30 seconds of boot up time. Ironic. It could save others from failure, but not itself.
                    </Typography>   
                    <br />
                    <br />
                    <Typography variant="body2">
                    Android. WebApp. Desktop. iOS. Long ago, the four platforms lived together in harmony. Then, everything changed when the WebApp Nation attacked. 
                    </Typography>
                    <Typography variant="body2">
                    Only the Avatar, master of all four elements, could stop them, but when the world needed him most, he vanished. 
                    </Typography>
                    <Typography variant="body2">
                    A hundred years passed and my brother and I discovered the new Avatar, a language named JavaScript. And although his airbending skills are great, he has a lot to learn before he's ready to save anyone. But I believe JavaScript can save the world.
                    </Typography>
                </Grid>
            </Grid>
        </Layout>
        );
    }
}
export default About;