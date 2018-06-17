import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormDialog from '../../components/FormDialog';
import ErrorSummary from '../../components/ErrorSummary';
import FormDialogTextField from '../../components/FormDialogTextField';
import FormDialogTextAreaField from '../../components/FormDialogTextAreaField';
import DialogFormContext from '../../components/DialogFormContext';

const styles = theme => ({
    container: {
        padding: theme.spacing.unit
    }
});

class DiscussionDialog extends Component {
    componentWillMount() {
        this.setState({ title: '', message: '' });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.showDialog !== this.props.showDialog) {
            this.setState({ title: '', message: '' });
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    handleAdd = event => {
        var discussion = {
            boardCategoryId: this.props.categoryId,
            title: this.state.title,
            message: this.state.message
        };
        this.props.addDiscussion(discussion);
    };

    render() {
        const { classes } = this.props;
        return (
            <DialogFormContext.Consumer>
                {context => <FormDialog addAction={this.handleAdd} title='Add Discusssion' addButtonText='Add Discusssion' showDialog={context.showDialog} setShowDialog={context.setShowDialog} >
                        <div>
                            <ErrorSummary errorData={context.errorData} />
                            <form className={classes.container} noValidate autoComplete="off">
                            <FormDialogTextField name="title" label="Title" value={this.state.title} errorData={context.errorData} onChange={this.handleChange} />
                            <FormDialogTextAreaField name="message" label="Message" cols={4} value={this.state.message} errorData={context.errorData} onChange={this.handleChange} />
                            </form>
                        </div>
                    </FormDialog>
                }
           </DialogFormContext.Consumer>
        );
    }
}

DiscussionDialog.displayName = 'DiscussionDialog';
export default withStyles(styles)(DiscussionDialog);
