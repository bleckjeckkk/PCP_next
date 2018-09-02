import React, { Component } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Typography, Table, TableHead, TableCell, TableRow, TableBody } from '@material-ui/core';

class Products extends Component{
    constructor(props){
        super(props);
        this.state = {
            products : [],
        }
    }

    componentWillMount(){
        fetch('http://localhost:4000/products')
        .then(response => response.json())
        .then(json => {
            console.log(json.data);
            this.setState({ products : json.data });
        });
    }

    render(){
        return(
            <AdminLayout>
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

export default Products