﻿import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/Forums';
import DiscussionForm from '../components/DiscussionForm';
import DiscussionPage from '../components/DiscussionPage';
/*
 * Routers exist to connect the Higher order components with the redux data store.
 * No display code should ever be here
 */

class DiscussionRouter extends Component {
    componentWillMount() {
        let id = this.props.match.params.discussionId;
        if (id !== undefined) {
            this.props.getDiscussion(id);
        }
    }

    componentWillReceiveProps(nextProps) {

    }

    renderDiscussionForm = () => {
        return (
            <DiscussionForm
                discussion={this.props.discussions.byHash[this.props.match.params.discussionId]}
                categoryId={this.props.match.params.categoryId}
                addDiscussion={this.props.addDiscussion}
                editDiscussion={this.props.editDiscussion}
            />
        );
    }

    renderDiscussionPage = () => {
        const discussion = this.props.discussions.byHash[this.props.match.params.discussionId];
        return(
            <div>
                {discussion !== undefined &&
                    <DiscussionPage
                        boards={this.props.boards}
                        boardId={this.props.match.params.boardId}
                        categoryId={this.props.match.params.categoryId}
                        categories={this.props.categories}
                        discussion={discussion}
                        persons={this.props.persons}
                        posts={this.props.posts}
                        getPostsForDiscussion={this.props.getPostsForDiscussion}
                        addPost={this.props.addPost}
                    />
                }
           </div >
        );
    }

    render() {
        return (
            <Switch>
                <Route path='/forums/:boardId/categories/:categoryId/discussions/:discussionId/edit' render={this.renderDiscussionForm} />
                <Route path='/forums/:boardId/categories/:categoryId/discussions/:discussionId/posts' render={this.renderDiscussionPage} />
            </Switch>
        );
    }
}
 
DiscussionRouter.displayName = 'DiscussionRouter';
export default connect(
    state => state.forums,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(DiscussionRouter);
