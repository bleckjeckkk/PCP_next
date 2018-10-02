import React, { Component } from 'react'
import AdminLayout from '../../components/AdminLayout'
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
    Snackbar,
} from '@material-ui/core'
import SnackbarWrapper from '../../components/Snackbar'

import { PCP_SERVER } from '../../res/ImportantThings'

class Users extends Component{

    queue = [];

    constructor(props){
        super(props);
        this.state = {
            users : [],
            confirmationModal : false,
            snackbarMessage : '',
            snackbarMode : '',
            open : false,
        }
    }

// DIALOG OPERATIONS (DELETE COMFIRMATION)
    handleClickOpen = (userID) => {
        console.log("Modal opened!");
        console.log("user ID:" + userID);
        this.setState({ 
            confirmationModal: true,
            selectedID : userID,
        });
    };
    
    handleConfirmationClose = () => {
        this.setState({ confirmationModal: false });
    };
// END DIALOG OPERATIONS

// CRUD OPERATIONS
    deleteItem = () => {
        this.showSnackbar('info','Deleting entry...');
        console.log("TODO: delete from database");
        this.setState({ confirmationModal: false });
        const userID = this.state.selectedID
        fetch(`${PCP_SERVER}/users/delete?userID=${userID}`)
        .then(response => response.json())
        .then(response => {
            if(response.msg == 'success'){
                this.showSnackbar('success','User deleted successfully!');
                this.getUsers();
            }else{
                this.showSnackbar('error','An error occured.');
                console.error(response.res);
            }
        })
    };
// END CRUD OPERATIONS

// SNACKBAR OPERATIONS
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
// END SNACKBAR THINGS
// COMPONENTDIDMOUNT AND THINGS

    getUsers(){
        fetch(`${PCP_SERVER}/users`)
        .then(response => response.json())
        .then(json => {
            console.log(json.res);
            this.setState({ users : json.res });
        });
    }
    
    componentDidMount(){
        var user = window.sessionStorage.getItem('info');
        if (user === null){
            user = { user : {}}
        }else{
            user = JSON.parse(user);
            if(!user.admin){
                Router.replace('/');
            }
        }
        this.getUsers();
    }
// END COMPONENTDIDMOUNT AND THINGS

    render(){
        return(
            <AdminLayout page="Users">
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
                                        <Button id={`btn-del-${usr.userID}`} color="secondary" onClick={() => this.handleClickOpen(usr.userID)}>X</Button>
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
                    <DialogTitle id="alert-dialog-title">{"Delete this user?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this user?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button id="confirm-btn-no" onClick={this.handleConfirmationClose} color="primary">
                            No
                        </Button>
                        <Button id="confirm-btn-yes" onClick={this.deleteItem.bind(this)} color="secondary" autoFocus>
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

export default Users