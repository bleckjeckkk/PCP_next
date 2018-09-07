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

    handleClickOpen = (feedbackID) => {
        console.log("Modal opened!");
        console.log("feedback ID:" + feedbackID);
        this.setState({ 
            confirmationModal: true,
            selectedID : feedbackID,
        });
    };
    
    handleClose = () => {
        this.setState({ confirmationModal: false });
    };

    deleteMessage = () => {
        console.log("TODO: delete from database");
        this.setState({ confirmationModal: false });
    };

    componentDidMount(){
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
                                        <Button color="secondary" onClick={() => this.handleClickOpen(feedback.feedbackID)}>X</Button>
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
                            Are you sure you want to delete this message?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            No
                        </Button>
                        <Button onClick={this.deleteMessage.bind(this)} color="secondary" autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </AdminLayout>
        )
    }
}

export default Messages