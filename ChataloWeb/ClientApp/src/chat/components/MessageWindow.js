import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grow from '@material-ui/core/Grow';
import QuoteText from './QuoteText';

const styles = theme => ({

    container: {
        padding: theme.spacing.unit
    },
    list: {
        overflowY: 'scroll',     
        height: 600,
        padding: 0
    },
    listItem: {
        display: 'flex',
        padding: 10
    },
    avatar: {
        backgroundColor: theme.palette.secondary.main
    }
});


class MessageWindow extends Component {

 

    componentDidUpdate() {
        this.chat.scrollTop = this.chat.scrollHeight;
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.container}>
            <ul className={classes.list} ref={ref => this.chat = ref}>
                {this.props.messages.map((message) => {
                    return (
                        <Grow key={message.messageId} timeout={600} in>
                            <li className={classes.listItem}>
                                <Avatar className={classes.avatar}>{message.person.firstName.charAt(0).toUpperCase() + message.person.lastName.charAt(0).toUpperCase()}</Avatar>
                                <QuoteText message={message} />
                                <div style={{ flex: 19 }} />
                            </li>
                        </Grow>
                    );
                })}
                </ul>
            </Paper>
        );
    }
}

 
MessageWindow.displayName = 'MessageWindow';
export default withStyles(styles)(MessageWindow);