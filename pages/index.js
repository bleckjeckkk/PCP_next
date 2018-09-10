import React, { Component } from 'react';
import Layout from '../components/Layout';

import { 
    Button,
    TextField,
    Card,
    CardContent,
    Typography, 
    Grid, 
    Paper, 
    List,
    ListItem, 
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemSecondaryAction, 
    Collapse,
    Popover,
    Tooltip
} from '@material-ui/core';

import Router from 'next/router'

import ProductDialog from '../components/ProductDialog'

import { PCP_SERVER } from '../res/ImportantThings'

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

class Index extends Component {

    componentDidMount(){
        Router.replace('/home', '/');
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default Index;
