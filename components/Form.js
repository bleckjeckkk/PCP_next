import React from 'react'
import { 
    Dialog,
    DialogTitle, 
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button
} from '@material-ui/core'

class Form extends React.Component{
    handleFormClose = () => {
        this.props.onClose();
    };

    handleAccept = () => {
        this.props.acceptFunction();
    };

    render(){
        const { onClose, isOpen, title, subtitle, acceptFunction, acceptText } = this.props;
        return(
            <Dialog
                open={isOpen}
                onClose={() => this.handleFormClose()}
                >
                <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {subtitle}
                    </DialogContentText>
                    {this.props.children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.handleFormClose()} color="primary" id="form-btn-cancel">
                        Cancel
                    </Button>
                    <Button onClick={() => this.handleAccept()} color="primary" id={`form-btn-acceptAction`}>
                        {acceptText}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default Form;