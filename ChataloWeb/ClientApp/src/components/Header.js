import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Toolbar from '@material-ui/core/Toolbar';
import { bindActionCreators } from 'redux';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { actionCreators } from '../store/Account';
import LoginOrRegisterForm from './LoginOrRegisterForm';

const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: theme.secondary
    },
    rightMenu: {

    },
    title: {
        textDecoration: 'none',
        flex: 1
    },
    toolbar: theme.mixins.toolbar
});

class Header extends Component {

    constructor(props) {
        super(props); 
        this.state = { showDialog: false };
    }
    componentWillMount() {
        this.props.attemptReLogin();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoggedIn && !this.props.isLoggedIn) {
            this.setState({ showDialog: false });
        }

    }

    handleClose = event => {
        this.setState({ showDialog: false });
    };

    handleMenu = event => {
        this.setState({ showDialog: true });
    };

    render() {
        const { classes } = this.props;
        return (
            <AppBar position="absolute" className={classes.appBar}>
                <Toolbar>
                    <Typography component={Link} to="/" variant="title" color="inherit" noWrap className={classes.title}>
                        Chatalo
                    </Typography>
                    {this.props.user !== null && <Typography>
                        Welcome {this.props.user.firstName}!
                    </Typography>}
                    {this.props.isLoggedIn
                        ? <Button color="inherit" onClick={this.handleMenu}>Logout</Button>
                        : <Button color="inherit" onClick={this.handleMenu}>Login</Button>
                    }
                </Toolbar>
                <LoginOrRegisterForm showDialog={this.state.showDialog} handleClose={this.handleClose} login={this.props.login} register={this.props.register} />
            </AppBar>
        );
    }
}


Header.displayName = 'Header';

export default connect(
    state => state.account,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(withStyles(styles)(Header));