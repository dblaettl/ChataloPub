import React, { Component } from 'react';
import { AppBar, IconButton, Toolbar, Button, Typography, Menu, MenuItem } from '@material-ui/core';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/Account';
import LoginOrRegisterForm from './LoginOrRegisterForm';
import MenuIcon from '@material-ui/icons/Menu';


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
    }
});

class Header extends Component {

    constructor(props) {
        super(props); 
        this.state = { showDialog: false, anchorEl: null };
    }
    componentWillMount() {
        this.props.attemptReLogin();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoggedIn && !this.props.isLoggedIn) {
            this.setState({ showDialog: false });
        }

    }

    handleCloseLogin = event => {
        this.setState({ showDialog: false });
    };

    showMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    hideMenu = event => {
        this.setState({ anchorEl: null });
    }

    handleLogin = event => {
        this.setState({ showDialog: true });
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        return (
            <AppBar position="absolute" className={classes.appBar}>

                <Toolbar>
                    {isWidthDown('xs', this.props.width) &&
                        <IconButton aria-owns={anchorEl ? 'simple-menu' : null} color="inherit" aria-label="Menu" aria-haspopup="true" onClick={this.showMenu}>
                            <MenuIcon />
                        </IconButton>
                    }
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}
                    >
                        <MenuItem component={Link} to={'/persons'} onClick={this.hideMenu}>People</MenuItem>
                        <MenuItem component={Link} to={'/forums'} onClick={this.hideMenu}>Forums</MenuItem>
                    </Menu>
                    <Typography component={Link} to="/" variant="title" color="inherit" noWrap className={classes.title}>
                        Chatalo
                    </Typography>
                    {this.props.user !== null &&
                        <Typography color="inherit">
                        {this.props.user.firstName} {this.props.user.lastName}
                        </Typography>}
                    {this.props.isLoggedIn
                        ? <Button color="inherit" onClick={this.handleLogin}>Logout</Button>
                        : <Button color="inherit" onClick={this.handleLogin}>Login</Button>
                    }
                </Toolbar>
                <LoginOrRegisterForm showDialog={this.state.showDialog} handleClose={this.handleCloseLogin} login={this.props.login} register={this.props.register} />
            </AppBar>
        );
    }
}


Header.displayName = 'Header';

export default connect(
    state => state.account,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(withWidth()(withStyles(styles)(Header)));