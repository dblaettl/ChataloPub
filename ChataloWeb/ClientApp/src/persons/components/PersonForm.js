import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Edit, Save, ViewList } from '@material-ui/icons';
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
        display: 'flex',
        flexWrap: 'wrap',
        padding: theme.spacing.unit
    },
    leftButton: {
        marginLeft: -12,
        marginRight: 20
    },
    flex: {
        flex: 1
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200
    }
});

/*
 * Components are where the display elements are, no store references should ever be here
 */

class PersonForm extends Component {
    componentWillMount() {
        if (this.props.person !== null) {
            this.setState({ 'personId': this.props.person.personId, 'firstName': this.props.person.firstName, 'lastName': this.props.person.lastName,  'city': this.props.person.city, 'state': this.props.person.state, 'editMode': false  });
        } else {
            this.setState({ 'personId': 0, 'firstName': '', 'lastName': '', 'city': '', 'state': '', 'editMode': true });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.person !== null) {
            this.setState({ 'personId': nextProps.person.personId, 'firstName': nextProps.person.firstName, 'lastName': nextProps.person.lastName, 'city': nextProps.person.city, 'state': nextProps.person.state, 'editMode': false });
        } else {
            this.setState({ 'personId': 0, 'firstName': '', 'lastName': '', 'city': '', 'state': '', 'editMode': false });
        }
    }

    handleEditClick = event => {
        this.setState({ 'editMode': true });
    };


    handleSaveClick = event => {
        if (this.props.person !== null) {
           //edit
            let person = {
                personId: this.state['personId'],
                firstName: this.state['firstName'],
                lastName: this.state['lastName'],
                city: this.state['city'],
                state: this.state['state']
            };
            this.props.editPerson(person);
        } else {
            //add
            let person = {
                firstName: this.state['firstName'],
                lastName: this.state['lastName'],
                city: this.state['city'],
                state: this.state['state']
            };
            this.props.addPerson(person);
        }
        this.setState({ 'editMode': false });
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
                            <IconButton component={NavLink} to='/persons' color='inherit' className={classes.leftButton}>
                                <ViewList />
                            </IconButton>
                        </Tooltip>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                        {this.props.person === null ? "Add" : "Edit"} Person
            </Typography>
                        {this.state['editMode'] === false
                            ? <Tooltip title="Edit">
                                <IconButton className={classes.button} aria-label="Edit" onClick={this.handleEditClick} >
                                    <Edit />
                                </IconButton>
                                </Tooltip>
                            :  <Tooltip title="Save">
                                <IconButton className={classes.button} aria-label="Save" onClick={this.handleSaveClick}  >
                                    <Save />
                                </IconButton>
                            </Tooltip>
                        }
                </Toolbar>
            </AppBar>
            <form className={classes.container} noValidate autoComplete="off">
             <div>
                <TextField
                    id="firstName"
                    label="First Name"
                    className={classes.textField}
                    value={this.state.firstName}
                    disabled={this.state['editMode'] === false}
                    onChange={this.handleChange('firstName')}
                    margin="normal"
                />
                <TextField
                    id="lastName"
                    label="Last Name"
                    className={classes.textField}
                    value={this.state.lastName}
                    disabled={this.state['editMode'] === false}
                    onChange={this.handleChange('lastName')}
                    margin="normal"
                />

                <TextField
                    id="city"
                    label="City"
                    className={classes.textField}
                    value={this.state.city}
                    onChange={this.handleChange('city')}
                    disabled={this.state['editMode'] === false}
                    margin="normal"
                />

                <TextField
                    id="state"
                    label="State"
                    className={classes.textField}
                    value={this.state.state}
                    onChange={this.handleChange('state')}
                    disabled={this.state['editMode'] === false}
                    margin="normal"
                />
            </div>
            </form>
            </div>
        );
    }
}

PersonForm.displayName = 'PersonForm';
export default withRouter(withStyles(styles)(PersonForm));