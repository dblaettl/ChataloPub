import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormDialog from '../../components/FormDialog';
import FormDialogTextField from '../../components/FormDialogTextField';
import DialogFormContext from '../../components/DialogFormContext';

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
        if ( this.props.showDialog === false && nextProps.showDialog === true) {
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
            <DialogFormContext.Consumer>
                {context => <FormDialog addAction={this.addAction} title='Add Board' errorData={context.errorData} addButtonText='Add Board' showDialog={context.showDialog} setShowDialog={context.setShowDialog} >
                        <form className={classes.container} noValidate autoComplete="off">
                            <FormDialogTextField name="name" label="Name" value={this.state.name} errorData={context.errorData} onChange={this.handleChange} />
                            <FormDialogTextField name="description" label="Description" value={this.state.description} errorData={context.errorData} onChange={this.handleChange} />
                        </form>
                    </FormDialog>
                }
          </DialogFormContext.Consumer>
        );
    }
}

BoardDialog.displayName = 'BoardDialog';
export default withStyles(styles)(BoardDialog);
