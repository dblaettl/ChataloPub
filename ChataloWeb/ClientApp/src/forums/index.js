import React from 'react';
import { Route, Switch } from 'react-router';
import ForumController from './controllers/ForumController';
import CategoryController from './controllers/CategoryController';
import { withStyles } from '@material-ui/core/styles';
import BoardController from './controllers/BoardController';
import DiscussionFormController from './controllers/DiscussionFormController';
import DiscussionPageController from './controllers/DiscussionPageController';
 
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
        <Route exact path='/forums' component={BoardController} />
        <Route path='/forums/:boardId' component={CategoryController} />
        <Route exact path='/forums/:boardId/categories/:categoryId/discussions' component={DiscussionFormController} />
        <Route path='/forums/:boardId/categories/:categoryId/discussions/:discussionId/posts' component={DiscussionPageController} />
    </Switch>;

ForumIndex.displayName = 'ForumIndex';
export default withStyles(styles)(ForumIndex);
