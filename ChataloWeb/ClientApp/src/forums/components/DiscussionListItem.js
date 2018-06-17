import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { RemoveRedEye, Message } from '@material-ui/icons';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ItemBadge from '../../components/ItemBadge';
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
        margin: theme.spacing.unit,
        textAlign: 'center'
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
        <Link to={`/forums/${props.category.boardId}/categories/${props.category.boardCategoryId}/discussions/${props.discussion.discussionId}/posts`} className={classes.link}>
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    {props.person !== undefined && <PersonAvatar person={props.person} />}
                    <div className={classes.text} >
                        <Tooltip classes={{ tooltip: classes.tooltip }} title={props.discussion.message}>
                            <Typography variant="headline" style={{ textDecoration: 'none', marginTop: 12 }}>{props.discussion.title}</Typography>
                        </Tooltip>    
                    </div>
                    <ItemBadge icon={<RemoveRedEye />} text={props.discussion.numViews} />
                    <ItemBadge icon={<Message />} text={props.discussion.numPosts} />
        </CardContent>
            </Card>
        </Link>
    );
};

DiscussionListItem.displayName = 'DiscussionListItem';
export default withStyles(styles)(DiscussionListItem);
