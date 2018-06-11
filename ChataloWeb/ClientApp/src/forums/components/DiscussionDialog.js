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
        top: theme.spacing.unit
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%'
    }
});



class DiscussionDialog extends Component {
    componentWillMount() {
        this.setState({ showDialog: false, title: '', message: '' });
    }

    componentWillReceiveProps(nextProps) {

    }

    showDialog = event => {
        this.setState({ showDialog: true, title: '', message: '' });
    };

    hideDialog = event => {
        this.setState({ showDialog: false });
    };

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
                        Add Category
                    </DialogTitle>
                    <DialogContent>
                        <form className={classes.container} noValidate autoComplete="off">
                            <div>
                                <TextField
                                    id="title"
                                    label="Title"
                                    className={classes.textField}
                                    value={this.state.title}
                                    onChange={this.handleChange('title')}
                                    margin="normal"
                                />
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
                        <Button aria-label="add" onClick={this.handleAdd}>Add Discussion</Button>
                    </DialogActions>
                </Dialog>
                </div>
        );
    }
}

DiscussionDialog.displayName = 'DiscussionDialog';
export default withStyles(styles)(DiscussionDialog);
