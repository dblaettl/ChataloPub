import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/Forums';
import DiscussionForm from '../components/DiscussionForm';

/*
 * Controllers exist to connect the Higher order components with the redux data store.
 * No display code should ever be here
 */

class DiscussionFormController extends Component {
    componentWillMount() {
        let id = this.props.match.params.discussionId;
        if (id !== undefined) {
            this.props.getDiscussion(id);
        }
    }

    componentWillReceiveProps(nextProps) {
        let id = nextProps.match.params.discussionId;
        if (id !== undefined) {
            if (this.props.discussion === null || id !== this.props.discussion.discussionId) {
                this.props.getDiscussion(id);
            }
        }
    }

    render() {
        return (
            <div>
                <DiscussionForm discussion={this.props.discussions.byHash[this.props.match.params.discussionId]} categoryId={this.props.match.params.categoryId} addDiscussion={this.props.addDiscussion} editDiscusssion={this.props.editDiscusssion} />;            
            </div>
        );
    }
}
 
DiscussionFormController.displayName = 'DiscussionFormController';
export default connect(
    state => state.forums,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(DiscussionFormController);
