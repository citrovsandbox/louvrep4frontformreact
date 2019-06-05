import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class SuccessModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    onClose = () => {
        window.location.replace('/');
    }

    render () {
        return (
        <Dialog
            open={this.props.show}
            onClose={this.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">Congratulations !</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Your order has been registered. You will receive an email at <b>vmm1996@gmail.com</b> with all of your tickets.<br/>
                    Welcome to Paris!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={this.onClose} color="primary">
                OK
            </Button>
            </DialogActions>
        </Dialog>
        )
    }
}

export default SuccessModal;