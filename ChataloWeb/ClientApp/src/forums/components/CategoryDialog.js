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



class CategoryDialog extends Component {
    componentWillMount() {
        this.setState({ name: '', description: '' });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.showDialog !== this.props.showDialog) {
            this.setState({ name: '', description: '' });
        }

    }

    handleShowDialog = event => {
        this.props.setShowDialog(true);
    };

    handleHideDialog = event => {
        this.props.setShowDialog(false);
    };

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
            <div>
                <Button variant="fab" mini color="primary" aria-label="add" className={classes.floating} onClick={this.handleShowDialog}>
                <Add />
            </Button>
                <Dialog open={this.props.showDialog} onClose={this.handleHideDialog}>
                    <DialogTitle style={{ width: 500 }}>
                        Add Category
                    </DialogTitle>
                    <DialogContent>
                        {this.props.errorData !== null && this.props.errorData.Summary !== undefined && <Typography className={classes.error}>{this.props.errorData.Summary}</Typography>}
                        <form className={classes.container} noValidate autoComplete="off">
                            <div>
                                <TextField
                                    id="name"
                                    label="Name"
                                    className={classes.textField}
                                    error={this.props.errorData !== null && this.props.errorData.Name !== undefined}
                                    helperText={this.props.errorData !== null && this.props.errorData.Name !== undefined ? this.props.errorData.Name : ''}
                                    value={this.state.name}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                />
                                <TextField
                                    id="description"
                                    label="Description"
                                    error={this.props.errorData !== null && this.props.errorData.Description !== undefined}
                                    helperText={this.props.errorData !== null && this.props.errorData.Description !== undefined ? this.props.errorData.Description : ''}
                                    className={classes.textField}
                                    value={this.state.description}
                                    onChange={this.handleChange('description')}
                                    margin="normal"
                                />
                            </div>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button aria-label="cancel" onClick={this.handleHideDialog}>Cancel</Button>
                        <Button aria-label="add" color='primary' onClick={this.handleAdd}>Add Category</Button>
                    </DialogActions>
                </Dialog>
                </div>
        );
    }
}

CategoryDialog.displayName = 'CategoryDialog';
export default withStyles(styles)(CategoryDialog);
