import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Send from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({

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

    render() {
        return (
            <Paper>
                <FormControl style={{ width: '100%' }}>
                    <InputLabel htmlFor="message">Message</InputLabel>
                    <Input
                        id="message"
                        type='text'
                        value={this.state.currentMessage}
                        onChange={this.handleChange('currentMessage')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Send Message"
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