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
    TextField,
    Grid,
    Snackbar,
} from '@material-ui/core'
import SnackbarWrapper from '../../components/Snackbar'
import FormWrapper from '../../components/Form'

import { PCP_SERVER } from '../../res/ImportantThings'

class Supermarkets extends Component{

    queue = [];

    constructor(props){
        super(props);
        this.state = {
            supermarkets : [],
            confirmationModal : false,
            formOpen : false,
            snackbarMessage : '',
            snackbarMode : '',
            selected : {},
            mode : ''
        }
    }
// DIALOG OPERATIONS (DELETE CONFIRMATION)

    handleClickOpen = (supermarketID) => {
        this.setState({ 
            confirmationModal: true,
            selectedID : supermarketID,
        });
    };
    
    handleConfirmationClose = () => {
        this.setState({ confirmationModal: false });
    };

// FORM OPERATIONS (ADD/UPDATE FORM)
    onChange(event){
        this.setState({ [event.target.id] : event.target.value });
    }

    handleFormOpen = (sm) => {
        sm ? 
            this.setState({
                formOpen : true, 
                id : sm.supermarketID,
                name : sm.supermarketName,
                address : sm.supermarketAddress,
                mode : 'update'
            })
         : 
            this.setState({ 
                formOpen : true,
                name : '',
                address : '',
                mode : 'add' 
            })
    };

    handleFormClose = () => {
        this.setState({ formOpen: false });
    };

// CRUD OPERATIONS
    addSupermarket = () => {
        this.getNextID();
        this.showSnackbar('info','Adding entry...');
        const market = {
            id : this.state.id,
            name : this.state.name,
            address : this.state.address,
        }
                
        fetch(`${PCP_SERVER}/supermarkets/add?supermarketID=${market.id}&supermarketName=${market.name}&supermarketAddress=${market.address}`)
        .then(response => response.json())
        .then(response => {
            if(response.msg == 'success'){
                this.showSnackbar('success','Entry added!');
            }else{
                this.showSnackbar('error','An error occured. Please try again.');
                console.error(response.res);
            }
        })


        this.handleFormClose();
        this.setState({ id : '' , name : '' , address : '' });
        this.refresh();
    }

    updateSupermarket = () => {
        this.showSnackbar('info','Updating entry...');
        this.handleFormClose();
        const market = {
            id : this.state.id,
            name : this.state.name,
            address : this.state.address,
        }

        fetch(`${PCP_SERVER}/supermarkets/update?supermarketID=${market.id}&supermarketName=${market.name}&supermarketAddress=${market.address}`)
        .then(response => response.json())
        .then(response => {
            if(response.msg == 'success'){
                this.showSnackbar('success','Entry updated!');
            }else{
                this.showSnackbar('error','An error occured. Please try again.');
                console.error(response.res);
            }
        })

        this.setState({ id : '' , name : '' , address : '' });
        this.refresh();
    }

    deleteItem = () => {
        this.showSnackbar('info',`Deleting entry...${this.state.selectedID}`);
        this.setState({ confirmationModal: false });
        const market = { id : this.state.selectedID };

        fetch(`${PCP_SERVER}/supermarkets/delete?supermarketID=${market.id}`)
        .then(response => response.json())
        .then(response => {
            if(response.msg == 'success'){
                this.showSnackbar('success','Entry deleted!');
            }else{
                this.showSnackbar('error','An error occured. Please try again.');
                console.error(response.res);
            }
        })

        this.refresh();
    };
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



// COMPONENTDIDMOUNT AND FETCHES
    getSupermarkets(){
        fetch(`${PCP_SERVER}/supermarkets`)
        .then(response => response.json())
        .then(json => {
            this.setState({ supermarkets : json.res });
        });
    }

    getNextID(){
        fetch(`${PCP_SERVER}/supermarkets/getCount`)
        .then(response => response.json())
        .then(json => {
            const next = json.res[0].count + 1;
            this.setState({ id : next});
        });
    }

    refresh(){
        this.getSupermarkets();
        this.getNextID();
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
        this.refresh();
    }

// RENDER
    render(){
        return(
            <AdminLayout page="Supermarkets">
                <Typography variant="display1"> Supermarkets </Typography>
                <Button onClick={() => this.handleFormOpen()} color="inherit" variant='outlined' style={{backgroundColor : '#999999', color : 'white' }}>
                    Add
                </Button>
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
                                        <Button color="primary" onClick={() => this.handleFormOpen(sm)}>EDIT</Button>
                                        |
                                        <Button color="secondary" onClick={() => this.handleClickOpen(sm.supermarketID)}>X</Button>
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
                    <DialogTitle id="alert-dialog-title">{"Delete this supermarket?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this supermarket?
                            <br />
                            <b>This will also delete ALL products assigned to this supermarket</b>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleConfirmationClose} color="primary">
                            No
                        </Button>
                        <Button onClick={this.deleteItem.bind(this)} color="secondary" autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
                
                <FormWrapper
                    isOpen={this.state.formOpen}
                    onClose={this.handleFormClose}
                    title='Supermarket Form'
                    subtitle={`To ${this.state.mode} a supermarket, please enter the supermarket name and its address.`}
                    acceptFunction={ this.state.mode == 'add' ? (this.addSupermarket) : (this.updateSupermarket)}
                    acceptText={this.state.mode}
                    >
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Supermarket Name"
                        fullWidth
                        onChange={this.onChange.bind(this)}
                        value={this.state.name}
                    />
                    <TextField
                        margin="dense"
                        id="address"
                        label="Supermarket Address"
                        fullWidth
                        onChange={this.onChange.bind(this)}
                        value={this.state.address}
                    />
                </FormWrapper>
                
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

export default Supermarkets