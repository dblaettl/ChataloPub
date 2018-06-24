import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import Moment from 'react-moment';
import Grow from '@material-ui/core/Grow';

const styles = theme => ({
    listItem: {
        '& div:nth-child(2) span:before': {
            content: 'no-open-quote',
            borderTop: '20px solid',
            borderRight: '14px solid transparent',
            borderLeft: '14px solid transparent',
            borderTopColor: theme.palette.primary.light,
            position: 'relative',
            left: -20,
            top: 10,
            zIndex: 1
        }
    },
    avatar: {
        backgroundColor: theme.palette.secondary.main
    },
    message: {
        backgroundColor: theme.palette.primary.light,
        borderRadius: '6px',
        padding: theme.spacing.unit
    }
});


const MessageItem = (props) => {
    const { classes } = props;
    return (
        <Grow timeout={600} in>
            <ListItem className={classes.listItem}>
            <Avatar className={classes.avatar}>{props.message.person.firstName.charAt(0).toUpperCase() + props.message.person.lastName.charAt(0).toUpperCase()}</Avatar>
            <Tooltip placement='top' title={<Moment format='MMM D, YYYY h:mm A'>{props.message.dateCreated}</Moment>}>
                <ListItemText classes={{ primary: classes.message }} primary={props.message.text} />             
            </Tooltip>
            <ListItemText style={{ flex: 100 }} primary='' />
            </ListItem>
        </Grow>
    );

};
MessageItem.displayName = 'MessageItem';
export default withWidth()(withStyles(styles)(MessageItem));
