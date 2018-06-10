import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/Forums';
import DiscussionPage from '../components/DiscussionPage';

/*
 * Controllers exist to connect the Higher order components with the redux data store.
 * No display code should ever be here
 */

class DiscussionPageController extends Component {
    componentWillMount() {
        let id = this.props.match.params.discussionId;
        if (id !== undefined) {
           this.props.getDiscussion(id);
        }
        let boardId = this.props.match.params.boardId;
       
        if (boardId !== undefined) {
            if (this.props.boards.byHash[boardId] === undefined) {
                this.props.getBoards();
            }
            if (this.props.categories.byHash[this.props.match.params.categoryId] === undefined) {
                this.props.getCategoriesForBoard(boardId);
            }
            
        }
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        const discussion = this.props.discussions.byHash[this.props.match.params.discussionId];
        return (
            <div>
                {discussion !== undefined && <DiscussionPage boards={this.props.boards} boardId={this.props.match.params.boardId} categoryId={this.props.match.params.categoryId} categories={this.props.categories} discussion={discussion} persons={this.props.persons} posts={this.props.posts} getPostsForDiscussion={this.props.getPostsForDiscussion} addPost={this.props.addPost} />}
            </div>
        );
    }
}
 
DiscussionPageController.displayName = 'DiscussionPageController';
export default connect(
    state => state.forums,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(DiscussionPageController);
