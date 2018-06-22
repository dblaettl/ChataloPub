import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

});

function ChatBoard (props) {
    const { classes } = props;
    return (
        <div>
           CHAT BOARD!
        </div>
    );
}

ChatBoard.displayName = 'ChatBoard';
export default withStyles(styles)(ChatBoard);