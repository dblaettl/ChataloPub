import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Card, CardContent } from '@material-ui/core';
import PostListItem from './PostListItem';
import ForumBreadCrumb from './ForumBreadCrumb';
import PostDialog from './PostDialog';
import ProfileCard from './ProfileCard';
import Moment from 'react-moment';
const styles = theme => ({
    bottomText: {
        position: 'absolute',
        bottom: theme.spacing.unit,
        width: '400px'
    },
    discussionDiv: {
        padding: theme.spacing.unit,
        display: 'flex',
        flexWrap: 'wrap'
    },
    text: {
        position: 'relative',
        padding: theme.spacing.unit * 2
    }
});

class DiscussionPage extends Component {
    componentWillMount() {
        this.setState({ showDialog: false, message: '' });
        if (this.props.discussion.posts === undefined) {
            this.props.getPostsForDiscussion(this.props.discussion.discussionId);
        }
    }

    componentWillReceiveProps(nextProps) {
 
    }

    render() {
        const { classes, posts, discussion, persons, boardId, addPost } = this.props;    
        return (
            <div>
                <PostDialog addPost={addPost} discussionId={discussion.discussionId} />
                <ForumBreadCrumb boardId={boardId} categoryId={discussion.boardCategoryId} discussionId={discussion.discussionId} />
                <Card>
                    <CardContent>
                        <div className={classes.discussionDiv}>
                            <ProfileCard person={persons.byHash[discussion.createdByPersonId]} />
                            <div className={classes.text}>
                                <Typography variant='title'>{discussion.title}</Typography>
                                <Typography variant='body2'>{discussion.message}</Typography>
                                <Typography className={classes.bottomText} variant='caption'><Moment format='MMM D, YYYY h:mm A'>{discussion.dateCreated}</Moment> </Typography>
                            </div>
                        </div>
 
                        {discussion.posts !== undefined
                            && discussion.posts.map((p, index) => {
                                let post = posts.byHash[p];
                            return <PostListItem key={p} message={post.message} date={post.dateCreated} index={index} person={persons.byHash[post.createdByPersonId]} />;
                            })
                        }
                        
                    </CardContent>
                </Card>
            </div>
        );
    }
}

DiscussionPage.displayName = 'DiscussionPage';
export default withStyles(styles)(DiscussionPage);
