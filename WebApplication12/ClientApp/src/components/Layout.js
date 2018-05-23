import React from 'react';
import NavMenu from './NavMenu';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { Link } from 'react-router-dom';
const styles = theme => ({
    root: {
        flexGrow: 1,
   
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: theme.secondary
    },
    title: {
        '&:focus': {
            outline: 0,
            textDecoration: 'none'
        },
        '&:hover': {
            outline: 0,
            textDecoration: 'none'
        }
    },
    drawerPaper: {
        position: 'relative',
        width: 240
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        minWidth: 0 // So the Typography noWrap works
    },
    toolbar: theme.mixins.toolbar
});

const Lay = props => 
    <div className={props.classes.root}>
        <AppBar position="absolute" className={props.classes.appBar}>
            <Toolbar>
          
                <Typography component={Link} to="/" variant="title" color="inherit" noWrap className={props.classes.title}>
                    Chatalo
          </Typography>
   
            </Toolbar>
        </AppBar>
         <NavMenu />
        <main className={props.classes.content}>
            <div className={props.classes.toolbar} />
            {props.children}  
        </main>
    </div>;

Lay.displayName = 'Layout';
export default withStyles(styles)(Lay);