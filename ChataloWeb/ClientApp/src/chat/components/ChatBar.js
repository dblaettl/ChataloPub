import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Send from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    container: {
        padding: theme.spacing.unit
    }
});

class ChatBar extends Component {

    constructor() {
        super();
        this.state = { currentMessage: '' };
    }


    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

 
    addMessage = event => {
        let currentMessage = this.state.currentMessage;
        this.props.sendMessage(currentMessage);
        this.setState({ currentMessage: '' });
    };


    onKeyPress = event => {
        if (event.charCode === 13) { // enter key pressed
            this.addMessage(event);
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.container}>
                <FormControl style={{ width: '100%' }}>
                    <InputLabel htmlFor="message">Message</InputLabel>
                    <Input
                        id="message"
                        type='text'
                        value={this.state.currentMessage}
                        onChange={this.handleChange('currentMessage')}
                        onKeyPress={this.onKeyPress}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    style={{top: -10 }}
                                    aria-label="Send Message"
                                    color="primary"
                                    onClick={this.addMessage}
                                >
                                    <Send />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Paper>
        );
    }
}

ChatBar.displayName = 'ChatBar';
export default withStyles(styles)(ChatBar);