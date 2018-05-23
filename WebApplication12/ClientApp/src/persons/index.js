import React from 'react';
import PersonRouter from './PersonRouter';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
 
const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit,
        overflowX: 'auto',
        padding: theme.spacing.unit
    }
});
/*
 * This File is solely to display the page for the Person section and wrap that in the router
 */
const PersonIndex = (props) => 
    <Paper className={props.classes.root}>
        <PersonRouter />
    </Paper>;

PersonIndex.displayName = 'PersonIndex';
export default withStyles(styles)(PersonIndex);
