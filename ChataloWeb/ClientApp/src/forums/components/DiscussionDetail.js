import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { RemoveRedEye, Message } from '@material-ui/icons';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
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
    link: {
        textDecoration: 'none'
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
                <CardContent className={classes.floating}>
                    <Message />
                    <Typography variant="subheading" style={{ textAlign: 'center' }} color="textSecondary">
                        {props.discussion.numPosts}
                    </Typography>
                </CardContent>
                <CardContent className={classes.floating}>
                    <RemoveRedEye />
                    <Typography variant="subheading" style={{ textAlign: 'center' }} color="textSecondary">
                        {props.discussion.numViews}
                    </Typography>
                </CardContent>
                <CardContent style={{ textDecoration: 'none' }} >
                    <Typography variant="headline" style={{ textDecoration: 'none' }}>{props.discussion.title}</Typography>
                    <Typography variant="subheading" color="textSecondary" style={{ textDecoration: 'none' }}>
                        {props.discussion.message}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
};

DiscussionDetail.displayName = 'DiscussionDetail';
export default withStyles(styles)(DiscussionDetail);
