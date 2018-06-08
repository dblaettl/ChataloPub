import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/Forums';
import DiscussionPosts from '../components/DiscussionPosts';

/*
 * Controllers exist to connect the Higher order components with the redux data store.
 * No display code should ever be here
 */

class DiscussionPostsController extends Component {
    componentWillMount() {
        let id = this.props.match.params.discussionId;
        if (id !== undefined) {
           this.props.getDiscussion(id);
        }
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        const discussion = this.props.discussions.byHash[this.props.match.params.discussionId];
        return (
            <div>
                {discussion !== undefined && <DiscussionPosts discussion={discussion} persons={this.props.persons} posts={this.props.posts} getPostsForDiscussion={this.props.getPostsForDiscussion} addPost={this.props.addPost} />}
            </div>
        );
    }
}
 
DiscussionPostsController.displayName = 'DiscussionPostsController';
export default connect(
    state => state.forums,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(DiscussionPostsController);
