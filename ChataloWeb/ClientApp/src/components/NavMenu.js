import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { People,Forum } from '@material-ui/icons';
import { withStyles, withTheme } from '@material-ui/core/styles';
 


const styles = theme => ({
    drawerPaper: {
        position: 'relative',
        width: 240
    },
    selected: {
        backgroundColor: theme.palette.primary.light,
        '&:focus': {
            outline: 0,
            textDecoration: 'none' 
  
        },
        '&:hover': {
            backgroundColor: theme.palette.primary.main
        }
    },
    unselected: {    
        '&:hover': {
            backgroundColor: theme.palette.primary.main
        }
    },
    toolbar: theme.mixins.toolbar // this gives the proper toolbar vertical distance
});

const Nav = (props ) =>
    <Drawer variant="permanent" classes={{ paper: props.classes.drawerPaper }}>
        <div className={props.classes.toolbar} />
        <List>
            <div>
                <ListItem component={Link} to={'/persons'} classes={{ root: props.location.pathname.startsWith("/persons") ? props.classes.selected : props.classes.unselected }} button dense>
                    <ListItemIcon>
                        <People />
                    </ListItemIcon>
                    <ListItemText primary="People" />
                </ListItem>
                <ListItem component={Link} to={'/forums'} classes={{ root: props.location.pathname.startsWith("/forums") ? props.classes.selected : props.classes.unselected }} button dense>
                    <ListItemIcon>
                        <Forum />
                    </ListItemIcon>
                    <ListItemText primary="Forums" />
                </ListItem>
                <ListItem component={Link} to={'/chat'} classes={{ root: props.location.pathname.startsWith("/chat") ? props.classes.selected : props.classes.unselected }} button dense>
                    <ListItemIcon>
                        <Forum />
                    </ListItemIcon>
                    <ListItemText primary="Chat" />
                </ListItem>
            </div>
        </List>
    </Drawer>;
Nav.displayName = 'NavMenu';
export default withRouter(withStyles(styles)(withTheme()(Nav)));
