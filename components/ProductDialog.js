import React from 'react';
import {
    Dialog,
    DialogTitle,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar
} from '@material-ui/core'
const emails = ['username@gmail.com', 'user02@gmail.com'];

class ProductDialog extends React.Component {
    handleClose = () => {
      this.props.onClose(this.props.selectedValue);
    };
  
    handleListItemClick = value => {
      this.props.onClose(value);
    };
  
    render() {
      const { onClose, selectedValue, ...other } = this.props;
      return (
        <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
          <DialogTitle id="simple-dialog-title">Select product</DialogTitle>
          <div>
            <List>
              {this.props.items.map(item => (
                <ListItem button onClick={() => this.handleListItemClick(item)} key={item.productID}>
                  <ListItemAvatar>
                    <Avatar>
                        {item.productAvailability ? 'Y' : 'N'}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.productName} secondary={item.productPrice}/>
                </ListItem>
              ),this)}
            </List>
          </div>
        </Dialog>
      );
    }
  }
  
  export default ProductDialog;