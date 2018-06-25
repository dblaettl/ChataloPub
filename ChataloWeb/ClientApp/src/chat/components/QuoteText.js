import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Moment from 'react-moment';

const styles = theme => ({
    message: {
        backgroundColor: theme.palette.primary.light,
        borderRadius: '6px',
        padding: theme.spacing.unit,
        marginLeft: 20,
        textIndent: -25,
        '&:before': {
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
    }
});


const QuoteText = (props) => {
    const { classes, message } = props;
    return (
        <Tooltip placement='top' title={<Moment format='MMM D, YYYY h:mm A'>{message.dateCreated}</Moment>}>
            <div className={classes.message}>{message.text}</div>
        </Tooltip>
    );
 
};
QuoteText.displayName = 'QuoteText';
export default  withStyles(styles)(QuoteText);
