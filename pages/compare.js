import React, { Component } from 'react';

import { Grid, Typography } from '@material-ui/core'

import Router from 'next/router'
import Layout from '../components/Layout'
import {
    Grid,
    CircularProgress
} from '@material-ui/core'
class Compare extends Component {

    componentDidMount(){
        Router.replace('/real/compare', '/compare');
    }

    render() {
        return (
            <Layout noHeader loading>
                <CircularProgress />
            </Layout>
        );
    }
}

export default Compare;
