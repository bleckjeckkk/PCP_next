import React, { Component } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Typography, Table, TableHead, TableCell, TableRow, TableBody } from '@material-ui/core';

class Supermarkets extends Component{
    constructor(props){
        super(props);
        this.state = {
            supermarkets : [],
        }
    }

    componentWillMount(){
        fetch('http://localhost:4000/supermarkets')
        .then(response => response.json())
        .then(json => {
            console.log(json.data);
            this.setState({ supermarkets : json.data });
        });
    }

    render(){
        return(
            <AdminLayout>
                <Typography variant="display1"> Supermarkets </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Supermarket</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.supermarkets.map( sm => {
                            return (
                                <TableRow key={sm.supermarketID}>
                                    <TableCell component="th">
                                        {sm.supermarketID}
                                    </TableCell>
                                    <TableCell>
                                        {sm.supermarketName}
                                    </TableCell>
                                    <TableCell>
                                        {sm.supermarketAddress}
                                    </TableCell>
                                    <TableCell>
                                        X
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </AdminLayout>
        )
    }
}

export default Supermarkets