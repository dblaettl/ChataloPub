import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import DiscussionListItem from './DiscussionListItem';
import ForumBreadCrumb from './ForumBreadCrumb';
import DiscussionDialog from './DiscussionDialog';
const styles = theme => ({
});

class DiscussionList extends Component {
    componentWillMount() {
        if (this.props.category.discussions === undefined) {
            this.props.getDiscussionsForCategory(this.props.category.boardCategoryId);
        }
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return (
            <div>
                <DiscussionDialog categoryId={this.props.category.boardCategoryId} addDiscussion={this.props.addDiscussion} />
                <ForumBreadCrumb boardId={this.props.category.boardId} categoryId={this.props.category.boardCategoryId} />
                {this.props.category.discussions !== undefined
                    && this.props.category.discussions.map((item, index) => {
                        const discussion = this.props.discussions.byHash[item];
                        let person;
                        if (discussion !== undefined) {
                            person = this.props.persons.byHash[discussion.createdByPersonId];
                        }
                        return <DiscussionListItem key={item} category={this.props.category} person={person} discussion={this.props.discussions.byHash[item]} />;
                    })
                }
            </div>
        );
    }
}


DiscussionList.displayName = 'DiscussionList';
export default withStyles(styles)(DiscussionList);
