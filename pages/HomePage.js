import React, { Component } from 'react';
import Layout from '../components/Layout';
//import '../../../node_modules/materialize-css/dist/css/materialize.css';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class HomePage extends Component {
    constructor(props){
        super(props)
        this.state = {
            text : '',
        };
    }

    handleClick(){
        console.log("Button clicked");
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
            <div class="column">
                <div class="row">
                    <h1>PRICE CHECKER PROGRAM</h1>
                </div>
                <div class="row" flexGrow={1}>

                <Card>
                    <div style={{width : 750}}>
                    <CardContent>
                        <div class="row" horizontal='center' vertical='center' flexGrow={1}>
                            <div class="column">
                                <TextField
                                id="name"
                                label="Product"
                                value={this.state.text}
                                onChange={this.onChange.bind(this)}
                                margin="normal"
                                />
                            </div>
                            <div class="column">
                                <Button variant="contained" onClick={this.handleClick.bind(this)}>Search</Button>
                            </div>
                        </div>
                    </CardContent>
                    </div>
                </Card>
                </div>
            </div>
            
            <div class="container">
                <p>Search string: {this.state.text}</p>
            </div>
        </Layout>
        );
    }
}

export default HomePage;
