import React from 'react';
import { Route, Switch } from 'react-router';
import ForumController from './controllers/ForumController';
import CategoryController from './controllers/CategoryController';
import { withStyles } from '@material-ui/core/styles';
 
 
const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit,
        overflowX: 'auto',
        padding: theme.spacing.unit
    }
});

const ForumIndex = (props) =>
    <Switch>
        <Route exact path='/forums' component={ForumController} />
        <Route path='/forums/:boardId/categories' component={CategoryController} />
    </Switch>;

ForumIndex.displayName = 'ForumIndex';
export default withStyles(styles)(ForumIndex);
