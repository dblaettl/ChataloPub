import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormDialog from '../../components/FormDialog';
import FormDialogTextAreaField from '../../components/FormDialogTextAreaField';
import DialogFormContext from '../../components/DialogFormContext';

const styles = theme => ({
    container: {
        padding: theme.spacing.unit
    }
});

class PostDialog extends Component {
    componentWillMount() {
        this.setState({ message: '' });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.showDialog !== this.props.showDialog) {
            this.setState({ message: '' });
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    handlePost = event => {
        var post = {
            discussionId: this.props.discussionId,
            message: this.state.message
        };
        this.props.addPost(post);
        this.setState({ showDialog: false });
    };

    render() {
        const { classes } = this.props;
        return (
            <DialogFormContext.Consumer>
                {context => <FormDialog addAction={this.handlePost} errorData={context.errorData} title='Add Post' addButtonText='Add Post' showDialog={context.showDialog} setShowDialog={context.setShowDialog} >
                    <div>
                        <form className={classes.container} noValidate autoComplete="off">
                            <FormDialogTextAreaField name="message" label="Message" cols={4} value={this.state.message} errorData={context.errorData} onChange={this.handleChange} />
                        </form>
                    </div>
                </FormDialog>
                }
            </DialogFormContext.Consumer>
        );
    }
}

PostDialog.displayName = 'PostDialog';
export default withStyles(styles)(PostDialog);
