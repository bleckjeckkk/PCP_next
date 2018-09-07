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

class Supermarkets extends Component{
    constructor(props){
        super(props);
        this.state = {
            supermarkets : [],
            confirmationModal : false,
        }
    }

    handleClickOpen = (supermarketID) => {
        console.log("Modal opened!");
        console.log("supermarket ID:" + supermarketID);
        this.setState({ 
            confirmationModal: true,
            selectedID : supermarketID,
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
                                        <Button color="secondary" onClick={() => this.handleClickOpen(sm.supermarketID)}>X</Button>
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
                    <DialogTitle id="alert-dialog-title">{"Delete this supermarket?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this supermarket?
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

export default Supermarkets