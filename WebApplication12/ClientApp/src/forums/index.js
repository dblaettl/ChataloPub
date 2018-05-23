import React from 'react';
import { Route, Switch } from 'react-router';
import ForumList from './ForumList';
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

const ForumController = (props) =>
    <Paper className={props.classes.root}>
        <Switch>
            <Route path='/forums' component={ForumList} />
        </Switch>
    </Paper>;

ForumController.displayName = 'ForumController';
export default withStyles(styles)(ForumController);
