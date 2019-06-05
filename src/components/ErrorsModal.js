import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class ErrorsModal extends React.Component {

    render () {
        return (
        <Dialog
            open={this.props.show}
            onClose={this.props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">You must provide all the fields</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                It looks like you didn't provide all necessary informations belonging to the tickets you want to afford. Please try to fix theses points :
            </DialogContentText>
            <List>
                {this.props.errors.map(email => (
                <ListItem button key={email}>
                    <ListItemText primary={email} />
                </ListItem>
                ))}
            </List>
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

export default ErrorsModal