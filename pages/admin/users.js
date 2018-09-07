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
} from '@material-ui/core';

class Users extends Component{
    constructor(props){
        super(props);
        this.state = {
            users : [],
            confirmationModal : false,
        }
    }

    handleClickOpen = (userID) => {
        console.log("Modal opened!");
        console.log("user ID:" + userID);
        this.setState({ 
            confirmationModal: true,
            selectedID : userID,
        });
    };
    
    handleClose = () => {
        this.setState({ confirmationModal: false });
    };

    deleteItem = () => {
        console.log("TODO: delete from database");
        this.setState({ confirmationModal: false });
    };

    componentDidMount(){
        fetch('http://localhost:4000/users')
        .then(response => response.json())
        .then(json => {
            console.log(json.res);
            this.setState({ users : json.res });
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
                                        <Button color="secondary" onClick={() => this.handleClickOpen(usr.userID)}>X</Button>
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
                    <DialogTitle id="alert-dialog-title">{"Delete this user?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this user?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            No
                        </Button>
                        <Button onClick={this.deleteItem.bind(this)} color="secondary" autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </AdminLayout>
        )
    }
}

export default Users