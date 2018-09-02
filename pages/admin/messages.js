import React, { Component } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Typography, Table, TableHead, TableCell, TableRow, TableBody } from '@material-ui/core';

class Messages extends Component{
    constructor(props){
        super(props);
        this.state = {
            messages : [],
        }
    }

    componentWillMount(){
        fetch('http://localhost:4000/feedbacks')
        .then(response => response.json())
        .then(json => {
            console.log(json.data);
            this.setState({ messages : json.data });
        });
    }

    render(){
        return(
            <AdminLayout>
                <Typography variant="display1"> Messages </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Sender</TableCell>
                            <TableCell>Message</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.messages.map( feedback => {
                            return (
                                <TableRow key={feedback.feedbackID}>
                                    <TableCell component="th">
                                        {feedback.feedbackID}
                                    </TableCell>
                                    <TableCell>
                                        {feedback.firstName}
                                    </TableCell>
                                    <TableCell>
                                        {feedback.productName}
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

export default Messages