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
    Select,
    MenuItem,
    InputLabel,
    FormControlLabel,
    Checkbox,
    Input,
    InputAdornment,
} from '@material-ui/core'
import SnackbarWrapper from '../../components/Snackbar'
import FormWrapper from '../../components/Form'
import { PCP_SERVER } from '../../res/ImportantThings'

function isEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

class Products extends Component{

    queue = [];

    constructor(props){
        super(props);
        this.state = {
            supermarkets : [],
            products : [],
            confirmationModal : false,
            formOpen : false,
            id : '',
            name : '',
            price : '',
            availability : '1',
            supID : '',
            match : '',
            mode : '' ,
            possibleMatches : [],
        }
    }

    handleClickOpen = (productID) => {
        this.setState({ 
            confirmationModal: true,
            selectedID : productID,
        });
    };
    

    onChange(event){
        this.setState({ [event.target.id] : event.target.value });
    };

    onSupermarketChange(event){
        this.setState({
            supID : event.target.value
        });
    };

    onMatchChange(event){
        this.setState({
            match : event.target.value
        });
    };

    onCheckChange(){
        const newVal = Math.abs(this.state.availability - 1)
        this.setState({
            availability : newVal
        });
    };

    handleFormOpen = (p) => {
        this.getMatches();
        if(isEmpty(p)){
            this.getNextID();
            this.setState({
                formOpen : true,
                name : '',
                price : '',
                availability : '1',
                supID : '',
                match : '0',
                mode : 'add' 
            })
        }else{
            this.setState({
                formOpen : true,
                id : p.productID,
                name : p.productName,
                price : p.productPrice,
                availability : p.productAvailability,
                supID : p.supermarketID,
                match : p.productMatch,
                mode : 'update'
            })
        }
    };

    handleFormClose = () => {
        this.setState({ 
            formOpen: false,
            nameMissing : false,
            priceMissing : false,
            availabilityMissing : false,
            supIDMissing : false,
            matchMissing : false 
        });
    };

    handleConfirmationClose = () => {
        this.setState({ 
            confirmationModal: false,
        });
    };

// CRUD OPERATIONS
    addItem = () => {
        this.showSnackbar('info','Adding item...');
        const { id, name, price, availability, supID, match } = this.state;
        const prod = {
            p_id : id,
            p_name : name,
            p_price : price,
            p_availability : availability,
            p_supID : supID,
            p_match : match,
        };
        if(prod.p_name == '' || prod.p_price == '' || (prod.p_availability != 0 && prod.p_availability != 1) || prod.p_supID ==''){
            this.showSnackbar('error',"Please input missing fields.");
            if(prod.p_name == ''){
                this.setState({ nameMissing : true});
            }else{
                this.setState({ nameMissing : false});
            }
            if(prod.p_price == ''){
                this.setState({ priceMissing : true});
            }else{
                this.setState({ priceMissing : false});
            }
            if((prod.p_availability != 0 && prod.p_availability != 1)){
                this.setState({ availabilityMissing : true});
            }else{
                this.setState({ availabilityMissing : false});
            }
            if(prod.p_supID == ''){
                this.setState({ supIDMissing : true});
            }else{
                this.setState({ supIDMissing : false});
            }
            return;
        }
        this.handleFormClose();
        fetch(`${PCP_SERVER}/products/add?productID=${prod.p_id}&productName=${prod.p_name}&productPrice=${prod.p_price}&productAvailability=${prod.p_availability}&supermarketID=${prod.p_supID}&productMatch=${prod.p_match}`)
        .then(response => response.json())
        .then(response => {
            if(response.msg=='success'){
                this.showSnackbar('success','Product Added!');
                this.refresh();
            }else{
                this.showSnackbar('error','An error occurred!');
                console.log(response.res);
            }
        })
    };

    updateItem = () => {
        this.showSnackbar('info','Updating item...');
        const { id, name, price, availability, supID, match } = this.state;
        const prod = {
            p_id : id,
            p_name : name,
            p_price : price,
            p_availability : availability,
            p_supID : supID,
            p_match : match,
        };
        if(prod.p_name == '' || prod.p_price == '' || (prod.p_availability != 0 && prod.p_availability != 1) || prod.p_supID ==''){
            this.showSnackbar('error',"Please input missing fields.");
            if(prod.p_name == ''){
                this.setState({ nameMissing : true});
            }else{
                this.setState({ nameMissing : false});
            }
            if(prod.p_price == ''){
                this.setState({ priceMissing : true});
            }else{
                this.setState({ priceMissing : false});
            }
            if((prod.p_availability != 0 && prod.p_availability != 1)){
                this.setState({ availabilityMissing : true});
            }else{
                this.setState({ availabilityMissing : false});
            }
            if(prod.p_supID == ''){
                this.setState({ supIDMissing : true});
            }else{
                this.setState({ supIDMissing : false});
            }
            return;
        }
        this.handleFormClose();
        console.log({prod});
        fetch(`http://localhost:4000/products/update?productID=${prod.p_id}&productName=${prod.p_name}&productPrice=${prod.p_price}&productAvailability=${prod.p_availability}&productMatch=${prod.p_match}&supermarketID=${prod.p_supID}`)
        .then(response => response.json())
        .then(response => {
            if(response.msg=='success'){
                this.showSnackbar('success','Product Updated!');
                console.log(response.res);
                this.refresh();
            }else{
                this.showSnackbar('error','An error occurred!');
                console.log(response.res);
            }
        })
    };

    deleteItem = () => {
        this.showSnackbar('info','Deleting item...');
        this.setState({ confirmationModal: false });
        fetch(`${PCP_SERVER}/products/delete?productID=${this.state.selectedID}`)
        .then(response => response.json())
        .then(response => {
            if(response.msg=='success'){
                this.showSnackbar('success','Product Deleted!');
                this.refresh();
            }else{
                this.showSnackbar('error','An error occurred!');
                console.log(response.res);
            }
        });
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
    getMatches(){
        const str = this.state.name;
        if(str == ''){
            this.setState({ 
                possibleMatches : [{
                    p_ID : 0,
                    p_name : 'no match yet',
                    p_market : '',
                }] 
            });
            return;
        }
        const search = str.split(' ')[0];
        fetch(`${PCP_SERVER}/products/find?productName=${search}`)
        .then(response => response.json())
        .then(json => {
            if(json.res.length > 0){
                var mtchs = json.res;
                const noElem = {
                    p_ID : 0,
                    p_name : 'no match yet',
                    p_market : '',
                }
                mtchs.unshift(noElem);
                this.setState({ possibleMatches : mtchs });
            }else{
                this.setState({ 
                    possibleMatches : [{
                        p_ID : 0,
                        p_name : 'no match yet',
                        p_market : '',
                    }] 
                });
            }
        });
    }

    getProducts(){
        fetch(`${PCP_SERVER}/products`)
        .then(response => response.json())
        .then(json => {
            this.setState({ products : json.res });
            fetch(`${PCP_SERVER}/products/getCount`)
            .then(response => response.json())
            .then(json => {
                const next = json.res[0].count + 1;
                this.setState({ id : next});
                console.log(next);
            });
        });
    }

    getSupermarkets(){
        fetch(`${PCP_SERVER}/supermarkets`)
        .then(response => response.json())
        .then(json => {
            this.setState({ supermarkets : json.res });
        });
    }

    getNextID(){
        fetch(`${PCP_SERVER}/products/getCount`)
        .then(response => response.json())
        .then(json => {
            const next = json.res[0].count + 1;
            this.setState({ id : next});
            console.log(next);
        });
    }

    refresh(){
        this.getProducts();
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
        this.getSupermarkets();
    }

    render(){
        return(
            <AdminLayout page="Products">
                <Typography variant="display1"> Products </Typography>
                <Button onClick={() => this.handleFormOpen()} color="inherit" variant='outlined' style={{backgroundColor : '#999999', color : 'white' }}>
                    Add
                </Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell numeric>Price</TableCell>
                            <TableCell>Availability</TableCell>
                            <TableCell>Supermarket</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.products.map( products => {
                            return (
                                <TableRow key={products.productID}>
                                    <TableCell component="th">
                                        {products.productID}
                                    </TableCell>
                                    <TableCell component="th">
                                        {products.productName}
                                    </TableCell>
                                    <TableCell numeric>
                                        {products.productPrice}
                                    </TableCell>
                                    <TableCell>
                                        {products.productAvailability ? 'Available' : 'Not Available'}
                                    </TableCell>
                                    <TableCell>
                                        {products.supermarketName}
                                    </TableCell>
                                    <TableCell>
                                        <Button color="primary" onClick={() => this.handleFormOpen(products)}>EDIT</Button>
                                        |
                                        <Button color="secondary" onClick={() => this.handleClickOpen(products.productID)}>X</Button>
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
                    <DialogTitle id="alert-dialog-title">{"Delete this product?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this product?
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
                    onClose={() => this.handleFormClose()}
                    title='Product Form'
                    subtitle={`To ${this.state.mode} a product, please enter the following information:`}
                    acceptFunction={ this.state.mode == 'add' ? (this.addItem) : (this.updateItem)}
                    acceptText={this.state.mode}
                    >
                    <FormControlLabel
                    control={
                        <Checkbox
                            error={this.state.availabilityMissing}
                            checked={this.state.availability}
                            onChange={this.onCheckChange.bind(this)}
                            value={this.state.availability}
                            color="primary"
                        />
                    }
                    label="Available"
                    />
                    <TextField
                        error={this.state.nameMissing}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Product Name"
                        fullWidth
                        onChange={this.onChange.bind(this)}
                        value={this.state.name}
                    />
                    <br />
                    <InputLabel>Product Price</InputLabel>
                    <Input
                        error={this.state.priceMissing}
                        fullWidth
                        id="price"
                        type="number"
                        label="Product Price"
                        value={this.state.price}
                        onChange={this.onChange.bind(this)}
                        startAdornment={<InputAdornment position="start">Php</InputAdornment>}
                    />
                    <br />
                    <InputLabel>Supermarket</InputLabel>
                    <Select
                        onClick={()=> {console.log("Supermarket clicked")}}
                        error={this.state.supIDMissing}
                        fullWidth
                        id="supID"
                        value={this.state.supID}
                        onChange={this.onSupermarketChange.bind(this)}
                        >
                        {this.state.supermarkets.map((sm) => {
                            return(
                                <MenuItem value={sm.supermarketID}>
                                    {sm.supermarketName}
                                </MenuItem>
                            )
                        },this)}
                    </Select>
                    <br />
                    <TextField
                        error={this.state.matchMissing}
                        margin="dense"
                        id="match"
                        label="Matched Product"
                        fullWidth
                        onChange={this.onChange.bind(this)}
                        value={this.state.match}
                    />
                    <br />
                    <InputLabel>Match</InputLabel>
                    <Select
                        onClick={()=> {this.getMatches()}}
                        error={this.state.matchMissing}
                        fullWidth
                        id="match"
                        value={this.state.match}
                        onChange={this.onMatchChange.bind(this)}
                        >
                        {this.state.possibleMatches.map((p) => {
                            return(
                                <MenuItem value={p.p_ID}>
                                    {p.p_market ? (`${p.p_name} [${p.p_market}]`) : (`${p.p_name}`)}
                                </MenuItem>
                            )
                        },this)}
                    </Select>
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

export default Products