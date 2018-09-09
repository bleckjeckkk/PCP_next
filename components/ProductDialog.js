import React from 'react'
import {
    Dialog,
    DialogTitle,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar
} from '@material-ui/core'

function isNotEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return true;
  }
  return false;
}

class ProductDialog extends React.Component {
    handleClose = () => {
      this.props.onClose(this.props.selectedValue);
    };
  
    handleListItemClick = value => {
      this.props.onClose(value);
    };
  
    render() {
      const { onClose, selectedValue, title, ...other } = this.props;
      return (
        <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
          <DialogTitle id="simple-dialog-title">{isNotEmpty(this.props.items) ? (isNotEmpty(this.props.title) ? `${this.props.title}` : 'Select product') : 'No Product Found!'}</DialogTitle>
          <div>
            <List>
              { isNotEmpty(this.props.items) ? 
                (
                  this.props.items.map(item => (
                    <ListItem button onClick={() => this.handleListItemClick(item)} key={item.p_ID}>
                      <ListItemAvatar>
                        <Avatar>
                            {item.p_ID}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={item.p_name} secondary={`Php ${item.p_price} [${item.p_market}]`}/>
                    </ListItem>
                  ),this)
                ) : (
                  <div />
                )
              }
            </List>
          </div>
        </Dialog>
      );
    }
  }
  
  export default ProductDialog;