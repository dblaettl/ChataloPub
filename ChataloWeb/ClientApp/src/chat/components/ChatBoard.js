import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import UserBar from './UserBar';
import MessageWindow from './MessageWindow';
import ChatBar from './ChatBar';
import Paper from '@material-ui/core/Paper';
const styles = theme => ({
    container: {
        padding: theme.spacing.unit
    }
});

function ChatBoard(props) {
    const { classes } = props;
    return (
        <div>
            <UserBar persons={props.persons} />
            <Paper className={classes.container}>
                <MessageWindow messages={props.messages} />
            </Paper>

            <ChatBar sendMessage={props.sendMessage} />
        </div>
    );
}

ChatBoard.displayName = 'ChatBoard';
export default withStyles(styles)(ChatBoard);