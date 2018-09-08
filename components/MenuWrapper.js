import React from 'react'
import {
    Menu
}from '@material-ui/core'

class MenuWrapper extends React.Component{
    handleClose = () =>{
        this.props.onClose();
    }

    render(){
        const {onClose, anchorEl, open, items } = this.props;
        return(
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={this.handleClose}
                PaperProps={{
                    style: {
                    maxHeight: 48 * 4.5,
                    width: 200,
                    },
                }}
            >
            {items.map((item)=>{
                return(
                    <MenuItem key={item.p_ID}>{item.p_name} -- Php {item.p_price}</MenuItem>
                )
            })}
            </Menu>
        );
    }
}

export default () => {
}