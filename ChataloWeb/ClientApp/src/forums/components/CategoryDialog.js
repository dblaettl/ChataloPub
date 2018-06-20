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

class CategoryDialog extends Component {
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

    handleAdd = event => {
        var category = {
            boardId: this.props.boardId,
            name: this.state.name,
            description: this.state.description
        };
        this.props.addCategory(category);
    };

    render() {
        const { classes } = this.props;
        return (
            <DialogFormContext.Consumer>
                {context => <FormDialog addAction={this.handleAdd} errorData={context.errorData} title='Add Category' addButtonText='Add Category' showDialog={context.showDialog} setShowDialog={context.setShowDialog} >
                        <div>
                            <form className={classes.container} noValidate autoComplete="off">
                                <FormDialogTextField name="name" label="Name" value={this.state.name} errorData={context.errorData} onChange={this.handleChange} />
                                <FormDialogTextField name="description" label="Description" value={this.state.description} errorData={context.errorData} onChange={this.handleChange} />
                            </form>
                        </div>
                    </FormDialog>
              }
            </DialogFormContext.Consumer>
        );
    }
}

CategoryDialog.displayName = 'CategoryDialog';
export default withStyles(styles)(CategoryDialog);
