import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { RemoveRedEye, Message } from '@material-ui/icons';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import PersonAvatar from './PersonAvatar';

const styles = theme => ({
    card: {
       
        '&:hover': {
            backgroundColor: theme.palette.secondary.light
        }
    },
    text: {
        textDecoration: 'none',
        flex: 1,
        margin: theme.spacing.unit
    },
    content: {
        display: 'flex',
        justifyContent: 'center'
    },
    badge: {
        margin: theme.spacing.unit
    },
    link: {
        textDecoration: 'none'
    },
    tooltip: {
        fontSize: 14
    },
    floating: {
        float: 'right'
    }
});

const DiscussionListItem = (props) => {
    const { classes } = props;
    return (
        <Link to={`/forums/${props.boardId}/categories/${props.categoryId}/discussions/${props.discussion.discussionId}/posts`} className={classes.link}>
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <PersonAvatar person={props.persons.byHash[props.discussion.createdByPersonId]} />
                    <div className={classes.text} >
                        <Tooltip classes={{ tooltip: classes.tooltip }} title={props.discussion.message}>
                    <Typography variant="headline" style={{ textDecoration: 'none', marginTop: 12 }}>{props.discussion.title}</Typography>
                     </Tooltip>    
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

DiscussionListItem.displayName = 'DiscussionListItem';
export default withStyles(styles)(DiscussionListItem);
