import React, { Component } from 'react';

import Router from 'next/router'
import Layout from '../components/Layout'
import {
    Grid,
    CircularProgress
} from '@material-ui/core'

class Index extends Component {

    componentDidMount(){
        Router.replace('/real/home', '/');
    }

    render() {
        return (
            <Layout noHeader loading>
                <CircularProgress />
            </Layout>
        );
    }
}

export default Index;
