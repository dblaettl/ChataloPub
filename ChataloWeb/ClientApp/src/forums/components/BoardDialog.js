import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Typography } from '@material-ui/core';
import FormDialog from '../../components/FormDialog';
import ErrorSummary from '../../components/ErrorSummary';
import FormDialogTextField from '../../components/FormDialogTextField';

const styles = theme => ({
    container: {
        padding: theme.spacing.unit
    }
});

class BoardDialog extends Component {
    componentWillMount() {
        this.setState({ name: '', description: '' });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.showDialog !== this.props.showDialog) {
            this.setState({ name: '', description: '' });
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    addAction = event => {
        var board = {
            name: this.state.name,
            description: this.state.description
        };
        this.props.addBoard(board);
    };

    render() {
        const { classes } = this.props;
        return (
            <FormDialog addAction={this.addAction} title='Add Board' addButtonText='Add Board' showDialog={this.props.showDialog} setShowDialog={this.props.setShowDialog} >
                <ErrorSummary errorData={this.props.errorData} />
                <form className={classes.container} noValidate autoComplete="off">
                    <FormDialogTextField name="name" label="Name" value={this.state.name} errorData={this.props.errorData} onChange={this.handleChange} />
                    <FormDialogTextField name="description" label="Description" value={this.state.description} errorData={this.props.errorData} onChange={this.handleChange} />
                </form>
            </FormDialog>
        );
    }
}

BoardDialog.displayName = 'BoardDialog';
export default withStyles(styles)(BoardDialog);
