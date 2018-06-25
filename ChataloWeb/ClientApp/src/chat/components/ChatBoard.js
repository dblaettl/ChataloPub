import React from 'react';
import UserBar from './UserBar';
import MessageWindow from './MessageWindow';
import ChatBar from './ChatBar';
 
function ChatBoard(props) {
    return (
        <div>
            <UserBar persons={props.persons} />
            <MessageWindow messages={props.messages} />
            <ChatBar sendMessage={props.sendMessage} />
        </div>
    );
}

ChatBoard.displayName = 'ChatBoard';
export default ChatBoard;