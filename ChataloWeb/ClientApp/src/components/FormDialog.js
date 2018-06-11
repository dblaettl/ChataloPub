import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, TextField, Typography } from '@material-ui/core';
import Add from '@material-ui/icons/Add';

const styles = theme => ({
    container: {
        padding: theme.spacing.unit
    },
    error: {
        color: 'red'
    },
    floating: {
        float: 'right',
        top: theme.spacing.unit
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%'
    }
});



class FormDialog extends Component {
    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    handleShowDialog = event => {
        this.props.setShowDialog(true);
    };

    handleHideDialog = event => {
        this.props.setShowDialog(false);
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button variant="fab" mini color="primary" aria-label="add" className={classes.floating} onClick={this.handleShowDialog}>
                    <Add />
                </Button>
                <Dialog open={this.props.showDialog} onClose={this.handleHideDialog}>
                    <DialogTitle style={{ width: 500 }}>
                        {this.props.title}
                    </DialogTitle>
                    <DialogContent>
                        {this.props.errorData !== null && this.props.errorData.Summary !== undefined && <Typography className={classes.error}>{this.props.errorData.Summary}</Typography>}
                        <form className={classes.container} noValidate autoComplete="off">
                            {children}
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button aria-label="cancel" onClick={this.handleHideDialog}>Cancel</Button>
                        <Button aria-label="add" color='primary' onClick={this.props.addAction}>{this.props.addButtonText}</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

FormDialog.displayName = 'FormDialog';
export default withStyles(styles)(FormDialog);
