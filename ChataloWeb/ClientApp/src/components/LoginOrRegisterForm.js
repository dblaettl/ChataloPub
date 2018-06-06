import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withRouter } from "react-router-dom";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    },
    container: {
        padding: theme.spacing.unit,
        display: 'flex',
        flexWrap: 'wrap'
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
    },

    textFieldNarrow: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '46%'
    }
});

/*
 * Components are where the display elements are, no store references should ever be here
 */

class LoginOrRegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = { email: '', password: '', firstName: '', lastName: '', city: '', state:'', tabValue: 0 };
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    handleLogin = (event) => {
        this.props.login(this.state.email, this.state.password);
    };

    handleRegister = (event) => {
        let user = {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            city: this.state.city,
            state: this.state.state
        };
        this.props.register(user);
    };

    handleTabChange = (event, tabValue) => {
        this.setState({ tabValue });
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    render() {
        const { classes } = this.props;
        return (
                <Dialog
                    open={this.props.showDialog}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <AppBar position="static">
                        <Tabs fullWidth value={this.state.tabValue} onChange={this.handleTabChange}>
                            <Tab label="Login" />
                            <Tab label="Register" />
                        </Tabs>
                    </AppBar>
                    <DialogTitle id="form-dialog-title">{this.state.tabValue === 0 ? 'Login' : 'Register'}</DialogTitle>
                {this.state.tabValue === 0
                    ? <DialogContent>
                        <DialogContentText>
                            Login Here
                        </DialogContentText>
                        <form className={classes.container} noValidate autoComplete="off">
                            <div>
                                <TextField
                                    id="email"
                                    label="Email"
                                   
                                    className={classes.textField}
                                    value={this.state.email}
                                    onChange={this.handleChange('email')}
                                    margin="normal"
                                />
                                <TextField
                                    id="password"
                                    label="Password"
                                    type="password"
                                    className={classes.textField}
                                    value={this.state.password}
                                    onChange={this.handleChange('password')}
                                    margin="normal"
                                />
                            </div>
                        </form>
                    </DialogContent>
                    :
                    <DialogContent>
                        <DialogContentText>
                            Register Here
                        </DialogContentText>
                        <form className={classes.container} noValidate autoComplete="off">
                            <div>
                                <TextField
                                    id="email"
                                    label="Email"
                                    className={classes.textField}
                                    value={this.state.email}
                                    onChange={this.handleChange('email')}
                                    margin="normal"
                                />
                                <TextField
                                    id="password"
                                    label="Password"
                                    type="password"
                                    className={classes.textField}
                                    value={this.state.password}
                                    onChange={this.handleChange('password')}
                                    margin="normal"
                                />
                                <TextField
                                    id="firstName"
                                    label="First Name"
                                    className={classes.textFieldNarrow}
                                    value={this.state.firstName}
                                    onChange={this.handleChange('firstName')}
                                    margin="normal"
                                />
                                <TextField
                                    id="lastName"
                                    label="Last Name"
                                    className={classes.textFieldNarrow}
                                    value={this.state.lastName}
                                    onChange={this.handleChange('lastName')}
                                    margin="normal"
                                />
                                <TextField
                                    id="city"
                                    label="City"
                                    className={classes.textFieldNarrow}
                                    value={this.state.city}
                                    onChange={this.handleChange('city')}
                                    margin="normal"
                                />
                                <TextField
                                    id="state"
                                    label="State"
                                    className={classes.textFieldNarrow}
                                    value={this.state.state}
                                    onChange={this.handleChange('state')}
                                    margin="normal"
                                />
                            </div>
                        </form>
                    </DialogContent>}
                    <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">Cancel</Button>
                    {this.state.tabValue === 0
                        ? <Button onClick={this.handleLogin} color="primary">Login</Button>
                        : <Button onClick={this.handleRegister} color="primary">Register</Button>
                    }
                    </DialogActions>
                  </Dialog> 
        );
    }
}

LoginOrRegisterForm.displayName = 'LoginOrRegisterForm';
export default withRouter(withStyles(styles)(LoginOrRegisterForm));