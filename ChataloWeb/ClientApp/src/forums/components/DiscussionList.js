import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import DiscussionListItem from './DiscussionListItem';
import DiscussionDialog from './DiscussionDialog';

const styles = theme => ({
});

class DiscussionList extends Component {
    componentWillMount() {

        if (this.props.category.discussions === undefined) {
            this.props.getDiscussionsForCategory(this.props.category.boardCategoryId,0,20);
        }
    }

    render() {
        return (
            <div>
                <DiscussionDialog categoryId={this.props.category.boardCategoryId} addDiscussion={this.props.addDiscussion} />
                {this.props.category.discussions
                    && this.props.category.discussions.map((item, index) => {
                    const discussion = this.props.discussions.byHash[item];
                        let person;
                        if (discussion) {
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
