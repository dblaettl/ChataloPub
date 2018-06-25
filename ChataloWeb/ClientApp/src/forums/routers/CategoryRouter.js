﻿import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/Forums';
import DiscussionRouter from './DiscussionRouter';
import DiscussionList from '../components/DiscussionList';

/*
 * Routers exist to connect the Higher order components with the redux data store.
 * No display code should ever be here
 */

class CategoryRouter extends Component {
    componentWillMount() {
        
    }

    componentWillReceiveProps(nextProps) {

    }

    renderDiscussionList = () => {
        const category = this.props.categories.byHash[this.props.match.params.categoryId];
        return (
            <div>
                {category &&
                <DiscussionList
                    category={category}
                    persons={this.props.persons}
                    discussions={this.props.discussions}
                    addDiscussion={this.props.addDiscussion}
                    getDiscussionsForCategory={this.props.getDiscussionsForCategory}
                />
                }
            </div>
        );
 
    }

    render() {
        return (
            <Switch>
                <Route exact path='/forums/:boardId/categories/:categoryId' render={this.renderDiscussionList} />
                <Route path='/forums/:boardId/categories/:categoryId/discussions/:discussionId' component={DiscussionRouter} />
            </Switch>
        );
    }
}
 
CategoryRouter.displayName = 'CategoryRouter';
export default connect(
    state => state.forums,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(CategoryRouter);
