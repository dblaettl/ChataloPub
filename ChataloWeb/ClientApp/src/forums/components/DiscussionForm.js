import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {  Save, ViewList } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { withRouter } from "react-router-dom";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit 
       
    },
    container: {
        padding: theme.spacing.unit
    },
    flex: {
        flex: 1
    },
    leftButton: {
        marginLeft: -12,
        marginRight: 20
    },
 
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%'
    }
});

/*
 * Components are where the display elements are, no store references should ever be here
 */

class DiscussionForm extends Component {
    componentWillMount() {
        if (this.props.discussion !== null) {
            this.setState({
                'title': this.props.discussion.title, 'message': ''
            });
        } else {
            this.setState({
                'title': '', 'message': ''
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.discussion !== null) {
            this.setState({
                'title': nextProps.discussion.title, 'message': ''
            });
        } else {
            this.setState({
                'title': '', 'message': ''
            });
        }
    }

    handleSaveClick = event => {
        if (this.props.discussion !== null) {
           //edit
            let discussion = {
                discussionId: this.props.discussion.discussionId,
                title: this.state['title'],
                message: this.state['message'],
                boardCategoryId: this.props.categoryId
            };
            this.props.editDiscussion(discussion);
        } else {
            //add
            let discussion = {
                discussionId: 0,
                title: this.state['title'],
                message: this.state['message'],
                boardCategoryId: this.props.categoryId
            };
            this.props.addDiscussion(discussion);
        }
    };
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
            <AppBar position='static' color='default'>
                    <Toolbar>
                        <Tooltip title="Back to List">
                            <IconButton component={NavLink} to='/forums' color='inherit' className={classes.leftButton}>
                                <ViewList />
                            </IconButton>
                        </Tooltip>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                        {this.props.discussion === null ? "Add" : "Edit"} Discussion
            </Typography>
                        <Tooltip title="Save">
                                <IconButton className={classes.button} aria-label="Save" onClick={this.handleSaveClick}  >
                                    <Save />
                                </IconButton>
                            </Tooltip>
      
                </Toolbar>
            </AppBar>
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
            </div>
        );
    }
}

DiscussionForm.displayName = 'DiscussionForm';
export default withRouter(withStyles(styles)(DiscussionForm));