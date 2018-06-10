import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, TextField } from '@material-ui/core';
import Add from '@material-ui/icons/Add';

const styles = theme => ({
    container: {
        padding: theme.spacing.unit
    },
    floating: {
        float: 'right',
        bottom: theme.spacing.unit * 3
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%'
    }
});



class PostDialog extends Component {
    componentWillMount() {
        this.setState({ showDialog: false, message: '' });
    }

    componentWillReceiveProps(nextProps) {

    }

    showDialog = event => {
        this.setState({ showDialog: true, message: '' });
    };

    hideDialog = event => {
        this.setState({ showDialog: false });
    };

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
            <div>
            <Button variant="fab" mini color="primary" aria-label="add" className={classes.floating} onClick={this.showDialog}>
                <Add />
            </Button>
                <Dialog open={this.state.showDialog} onClose={this.hideDialog}>
                    <DialogTitle style={{ width: 500 }}>
                        Add Post
                    </DialogTitle>
                    <DialogContent>
                        <form className={classes.container} noValidate autoComplete="off">
                            <div>
                                <TextField
                                    id="message"
                                    label="Message"
                                    multiline
                                    rows={4}
                                    className={classes.textField}
                                    value={this.state.message}
                                    onChange={this.handleChange('message')}
                                    margin="normal"
                                />
                            </div>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button aria-label="post" onClick={this.handlePost}>Post</Button>
                    </DialogActions>
                </Dialog>
                </div>
        );
    }
}

PostDialog.displayName = 'PostDialog';
export default withStyles(styles)(PostDialog);
