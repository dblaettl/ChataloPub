import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/Forums';
import DiscussionFormController from './DiscussionFormController';
import DiscussionPageController from './DiscussionPageController';
/*
 * Controllers exist to connect the Higher order components with the redux data store.
 * No display code should ever be here
 */

class CategoryController extends Component {
    componentWillMount() {
 
    }

    componentWillReceiveProps(nextProps) {
     
    }

    render() {
        return (
            <Switch>
                <Route exact path='/forums/:boardId/categories/:categoryId/discussions' component={DiscussionFormController} />
                <Route path='/forums/:boardId/categories/:categoryId/discussions/:discussionId/posts' component={DiscussionPageController} />
            </Switch>
        );
    }
}
 
CategoryController.displayName = 'CategoryController';
export default connect(
    state => state.forums,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(CategoryController);
