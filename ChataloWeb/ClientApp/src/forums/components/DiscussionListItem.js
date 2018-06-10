import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { RemoveRedEye, Message } from '@material-ui/icons';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

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
    tooltip: {
        fontSize: 14
    },
    floating: {
        float: 'right'
    }
});


const PersonAvatar = (props) => {
    return (
        <div>
            {props.person !== undefined &&
                <Avatar className={props.classes.avatar}>{props.person.firstName.charAt(0).toUpperCase() + props.person.lastName.charAt(0).toUpperCase()}</Avatar>
            }
        </div>
        );
};
PersonAvatar.displayName = 'PersonAvatar';
const DiscussionListItem = (props) => {
    const { classes } = props;
    return (
        <Link to={`/forums/${props.boardId}/categories/${props.categoryId}/discussions/${props.discussion.discussionId}/posts`} className={classes.link}>
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <PersonAvatar classes={props.classes} person={props.persons.byHash[props.discussion.createdByPersonId]} />
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
