import React, { Component } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { 
    Typography,
    Table, 
    TableHead, 
    TableCell, 
    TableRow, 
    TableBody, 
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@material-ui/core';

class Messages extends Component{
    constructor(props){
        super(props);
        this.state = {
            messages : [],
            confirmationModal : false,
        }
    }

    handleClickOpen = () => {
        this.setState({ confirmationModal: true });
    };
    
    handleClose = () => {
        this.setState({ confirmationModal: false });
    };

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
                                        <Button color="secondary" onClick={this.handleClickOpen.bind(this)}>X</Button>
                                    </TableCell>
                                </TableRow>
                            )
                        },this)}
                    </TableBody>
                </Table>
                <Dialog
                open={this.state.confirmationModal}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Delete this message?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous location data to
                        Google, even when no apps are running.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                        No
                        </Button>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                        Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </AdminLayout>
        )
    }
}

export default Messages