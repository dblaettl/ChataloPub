import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit

    },
    flex: {
        flex: 1
    },
    table: {
        minWidth: 700
    }
});


const PersonPager = (props) => {
    const { classes } = props;
    const prevOffset = (props.offset || 0) - 10;
    const nextOffset = (props.offset || 0) + 10;
    return (
        <AppBar position='static' color='default'>
            <Toolbar>
                {props.offset > 0 && <IconButton className={classes.button} aria-label="Add" component={NavLink} to={`/persons/${prevOffset}/10`} >
                    <ArrowBack />
                </IconButton>}
                <Typography variant="title" color="inherit" className={classes.flex} />
                <IconButton className={classes.button} aria-label="Add" component={NavLink} to={`/persons/${nextOffset}/10`} >
                    <ArrowForward />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

PersonPager.displayName = 'PersonPager';
export default withStyles(styles)(PersonPager);
