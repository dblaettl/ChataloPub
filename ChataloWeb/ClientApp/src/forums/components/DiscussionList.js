import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import DiscussionListItem from './DiscussionListItem';
import DiscussionPager from './DiscussionPager';
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
                <ForumBreadCrumb board={this.props.board} category={this.props.category} />
                {this.props.category !== null
                    && this.props.category.discussions !== undefined
                    && this.props.category.discussions.map((item, index) =>
                    <DiscussionListItem key={item} boardId={this.props.board.boardId} persons={this.props.persons} categoryId={this.props.category.boardCategoryId} discussion={this.props.discussions.byHash[item]} />
                    )
                }
               
            </div>
        );
    }
}

 
DiscussionList.displayName = 'DiscussionList';
export default withStyles(styles)(DiscussionList);
