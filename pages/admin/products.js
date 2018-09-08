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
} from '@material-ui/core'
import { PCP_SERVER } from '../../res/ImportantThings'
class Products extends Component{
    constructor(props){
        super(props);
        this.state = {
            products : [],
            confirmationModal : false,
        }
    }

    handleClickOpen = (productID) => {
        console.log("Modal opened!");
        console.log("product ID:" + productID);
        this.setState({ 
            confirmationModal: true,
            selectedID : productID,
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
        fetch(`${PCP_SERVER}/products`)
        .then(response => response.json())
        .then(json => {
            console.log(json.res);
            this.setState({ products : json.res });
        });
    }

    render(){
        return(
            <AdminLayout page="Products">
                <Typography variant="display1"> Products </Typography>
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
                                    <TableCell>
                                        {products.productPrice}
                                    </TableCell>
                                    <TableCell>
                                        {products.productAvailability ? 'Available' : 'Not Available'}
                                    </TableCell>
                                    <TableCell>
                                        {products.supermarketName}
                                    </TableCell>
                                    <TableCell>
                                        <Button color="secondary" onClick={() => this.handleClickOpen(products.productID)}>X</Button>
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
                    <DialogTitle id="alert-dialog-title">{"Delete this product?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this product?
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

export default Products