import React from 'react';
import Header from './Header';
import NavMenu from './NavMenu';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex'
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
        <Header />
        {isWidthUp('sm', props.width) && <NavMenu />}
        <main className={props.classes.content}>
            <div className={props.classes.toolbar} />
            {props.children}  
        </main>
    </div>;

Lay.displayName = 'Layout';
export default withWidth()(withStyles(styles)(Lay));