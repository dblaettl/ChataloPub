﻿import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@material-ui/core';
import ErrorSummary from './ErrorSummary';
import Add from '@material-ui/icons/Add';

const styles = theme => ({
    floating: {
        right: 20,
        top: 80,
        position: 'fixed'
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
                        <ErrorSummary errorData={this.props.errorData} />
                        {this.props.children}
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
