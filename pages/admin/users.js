import React, { Component } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Typography, Table, TableHead, TableCell, TableRow, TableBody, Tooltip } from '@material-ui/core';

class Users extends Component{
    constructor(props){
        super(props);
        this.state = {
            users : [],
        }
    }

    componentWillMount(){
        fetch('http://localhost:4000/users')
        .then(response => response.json())
        .then(json => {
            console.log(json.data);
            this.setState({ users : json.data });
        });
    }

    render(){
        return(
            <AdminLayout>
                <Typography variant="display1"> Users </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.users.map( usr => {
                            return (
                                <TableRow key={usr.userID}>
                                    <TableCell component="th">
                                        {usr.userName}
                                    </TableCell>
                                    <TableCell>
                                        {usr.firstName}
                                    </TableCell>
                                    <TableCell>
                                        {usr.lastName}
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

export default Users