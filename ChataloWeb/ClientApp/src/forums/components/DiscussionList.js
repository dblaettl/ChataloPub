import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DiscussionListItem from './DiscussionListItem';
import ForumBreadCrumb from './ForumBreadCrumb';
import DiscussionDialog from './DiscussionDialog';
const styles = theme => ({
});

const DiscussionList = (props) => {
    return (
        <div>
            <DiscussionDialog categoryId={props.category.boardCategoryId} addDiscussion={props.addDiscussion} />
            <ForumBreadCrumb boardId={props.category.boardId} categoryId={props.category.boardCategoryId} />
            {props.category.discussions
                && props.category.discussions.map((item, index) => {
                    const discussion = props.discussions.byHash[item];
                    let person;
                    if (discussion) {
                        person = props.persons.byHash[discussion.createdByPersonId];
                    }
                    return <DiscussionListItem key={item} category={props.category} person={person} discussion={props.discussions.byHash[item]} />;
                })
            }
        </div>
    );
};


DiscussionList.displayName = 'DiscussionList';
export default withStyles(styles)(DiscussionList);
