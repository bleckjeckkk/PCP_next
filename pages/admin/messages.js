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
    Grid,
    Snackbar,
} from '@material-ui/core';
import SnackbarWrapper from '../../components/Snackbar'
import Router from 'next/router'

import { PCP_SERVER } from '../../res/ImportantThings'

class Messages extends Component{

    queue = [];

    constructor(props){
        super(props);
        this.state = {
            messages : [],
            confirmationModal : false,
            open : false,
            snackbarMessage : '',
            snackbarMode : '',
        }
    }
// PAGE OPERATIONS
    handleClickOpen = (feedbackID) => {
        this.setState({ 
            confirmationModal: true,
            selectedID : feedbackID,
        });
    };
    
    handleConfirmationClose = () => {
        this.setState({ confirmationModal: false });
    };

    deleteMessage = () => {
        this.showSnackbar('info','Deleting message...');
        const id = this.state.selectedID;
        this.setState({ confirmationModal: false });
        fetch(`${PCP_SERVER}/feedbacks/delete?feedbackID=${id}`)
        .then(response => response.json())
        .then(response => {
            if(response.msg == 'success'){
                this.showSnackbar('success','Message Deleted!');
                this.getFeedbacks();
            }
        })
    };

// END OF PAGE OPERATIONS

// SNACKBAR THINGS
    showSnackbar(mode, message){
        this.queue.push({
            message,
            mode,
            key: new Date().getTime(),
        });
    
        if (this.state.open) {
          this.setState({ open: false });
        } else {
          this.processQueue();
        }
    }

    processQueue = () => {
        if (this.queue.length > 0) {
          const msg = this.queue.shift();
          this.setState({
            snackbarMessage: msg.message,
            snackbarMode : msg.mode,
            open: true,
          });
        }
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({ open: false });
    };

    handleExited = () => {
        this.processQueue();
    };

// END OF SNACKBAR THINGS

    getFeedbacks(){
        fetch(`${PCP_SERVER}/feedbacks`)
        .then(response => response.json())
        .then(json => {
            console.log(json.res);
            this.setState({ messages : json.res });
        });
    }

    componentDidMount(){
        this.getFeedbacks();
    }

    render(){
        return(
            <AdminLayout page="Messages">
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
                                    <TableCell style={{ maxWidth : 300 , wordWrap : 'break-word'}}>
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
                    onClose={this.handleConfirmationClose}
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
                        <Button onClick={this.handleConfirmationClose} color="primary">
                            No
                        </Button>
                        <Button onClick={this.deleteMessage.bind(this)} color="secondary" autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    onExited={this.handleExited}
                    >
                    <SnackbarWrapper
                        variant={this.state.snackbarMode}
                        message={this.state.snackbarMessage}
                        onClose={this.handleClose}
                    />
                </Snackbar>
            </AdminLayout>
        )
    }
}

export default Messages