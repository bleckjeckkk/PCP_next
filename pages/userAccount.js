import React, { Component } from 'react'

import Router from 'next/router'
import Layout from '../components/Layout'
import {
    Grid,
    CircularProgress
} from '@material-ui/core'
class UserAccount extends Component {

    componentDidMount(){
        Router.replace('/real/userAccount', '/userAccount');
    }

    render() {
        return (
            <Layout noHeader loading>
                <CircularProgress />
            </Layout>
        );
    }
}

export default UserAccount;
