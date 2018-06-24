import React from 'react';
import Moment from 'react-moment';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import MessageItem from './MessageItem';
const styles = theme => ({
    container: {
        padding: theme.spacing.unit
    }
});

function MessageWindow(props) {
    const { classes } = props;
    return (
        <Paper className={classes.container}>
            <List>
                {props.messages && props.messages.map((message) => <MessageItem key={message.messageId} message={message} />)}
            </List>
        </Paper>
    );
}

MessageWindow.displayName = 'MessageWindow';
export default withStyles(styles)(MessageWindow);