import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class ErrorModal extends React.Component {
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
            onClose={this.props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">An error occured during the transaction</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {this.props.errorText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={this.props.onClose} color="primary">
                OK
            </Button>
            </DialogActions>
        </Dialog>
        )
    }
}

export default ErrorModal;