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



class BoardDialog extends Component {
    componentWillMount() {
        this.setState({ showDialog: false, name: '', description: '' });
    }

    componentWillReceiveProps(nextProps) {

    }

    showDialog = event => {
        this.setState({ showDialog: true, name: '', description: '' });
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
        var board = {
            name: this.state.name,
            description: this.state.description
        };
        this.props.addBoard(board);
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
                        Add Board
                    </DialogTitle>
                    <DialogContent>
                        <form className={classes.container} noValidate autoComplete="off">
                            <div>
                                <TextField
                                    id="name"
                                    label="Name"
                                    className={classes.textField}
                                    value={this.state.name}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                />
                                <TextField
                                    id="description"
                                    label="Description"
                                    className={classes.textField}
                                    value={this.state.description}
                                    onChange={this.handleChange('description')}
                                    margin="normal"
                                />
                            </div>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button aria-label="add" onClick={this.handleAdd}>Add Board</Button>
                    </DialogActions>
                </Dialog>
                </div>
        );
    }
}

BoardDialog.displayName = 'BoardDialog';
export default withStyles(styles)(BoardDialog);
