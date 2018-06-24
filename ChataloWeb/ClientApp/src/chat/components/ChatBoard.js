import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import UserBar from './UserBar';
import MessageWindow from './MessageWindow';
import ChatBar from './ChatBar';
const styles = theme => ({

});

function ChatBoard (props) {
    return (
        <div>
            <UserBar persons={props.persons} />
            <MessageWindow messages={props.messages} />
            <ChatBar sendMessage={props.sendMessage} />
        </div>
    );
}

ChatBoard.displayName = 'ChatBoard';
export default withStyles(styles)(ChatBoard);