import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { RemoveRedEye, Message } from '@material-ui/icons';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
    chipDiv: {
        padding: 6
    },
    card: {
        '&:hover': {
            backgroundColor: green[100] 
        }
    },
    text: {
        textDecoration: 'none',
        flex: 1,
        margin: theme.spacing.unit
    },
    content: {
        display: 'flex'
    },
    avatar: {
        marginTop: theme.spacing.unit * 2,
        margin: theme.spacing.unit
    },
    badge: {
        margin: theme.spacing.unit
    },
    link: {
        textDecoration: 'none'
    },
    left: {
        float: 'left'
    },
    floating: {
        float: 'right'
    }
});


const DiscussionDetail = (props) => {
    const { classes } = props;
    return (
        <Link to={`/forums/${props.boardId}/categories/${props.categoryId}/discussions/${props.discussion.discussionId}/posts`} className={classes.link}>
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <Avatar className={classes.avatar}>DB</Avatar>
                    <div className={classes.text} >
                    <Typography variant="headline" style={{ textDecoration: 'none' }}>{props.discussion.title}</Typography>
                    <Typography variant="subheading" color="textSecondary" style={{ textDecoration: 'none' }}>
                        {props.discussion.message}
                    </Typography>
                    </div>
                    <div className={classes.badge}>
                    <RemoveRedEye />
                    <Typography variant="subheading" style={{ textAlign: 'center' }} color="textSecondary">
                        {props.discussion.numViews}
                    </Typography>
                    </div>
                    <div className={classes.badge}>
                    <Message />
                    <Typography variant="subheading" style={{ textAlign: 'center' }} color="textSecondary">
                        {props.discussion.numPosts}
                    </Typography>
                    </div>
        </CardContent>

            </Card>
        </Link>
    );
};

DiscussionDetail.displayName = 'DiscussionDetail';
export default withStyles(styles)(DiscussionDetail);
