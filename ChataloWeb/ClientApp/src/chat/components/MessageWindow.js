import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Moment from 'react-moment';
import Grow from '@material-ui/core/Grow';

const styles = theme => ({
 
    list: {
        overflowY: 'scroll',     
        height: 600
    },
    listItem: {
        display: 'flex',
        padding: 10,
        '& div:nth-child(2):before': {
            content: 'no-open-quote',
            borderTop: '20px solid',
            borderRight: '14px solid transparent',
            borderLeft: '14px solid transparent',
            borderTopColor: theme.palette.primary.light,
            position: 'relative',
            left: 5,
            top: 12,
            zIndex: 1
        }
    },
    avatar: {
        backgroundColor: theme.palette.secondary.main
    },
    message: {
        backgroundColor: theme.palette.primary.light,
        borderRadius: '6px',
        padding: theme.spacing.unit,
        marginLeft: 20,
        textIndent: -25
    }
});


class MessageWindow extends Component {


    
    componentDidUpdate() {
        this.chat.scrollTop = this.chat.scrollHeight;
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.list} ref={ref => (this.chat = ref)}>
                {this.props.messages.map((message) => {
                    return (
                        <Grow key={message.messageId} timeout={600} in>
                            <div className={classes.listItem}>
                                <Avatar className={classes.avatar}>{message.person.firstName.charAt(0).toUpperCase() + message.person.lastName.charAt(0).toUpperCase()}</Avatar>
                                <Tooltip placement='top' title={<Moment format='MMM D, YYYY h:mm A'>{message.dateCreated}</Moment>}>
                                    <div className={classes.message}>{message.text}</div>
                                </Tooltip>
                                <div style={{ flex: 19 }} />
                            </div>
                        </Grow>
                    );
                })}
          
            </div>
        );
    }
}

 
MessageWindow.displayName = 'MessageWindow';
export default withStyles(styles)(MessageWindow);