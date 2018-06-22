import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
const styles = theme => ({
    error: {
        color: 'red'
    }
});

const ErrorSummary = (props) => {
    const { classes } = props;

    return (
        <div>
            {props.errorData  && props.errorData.Summary && <Typography className={classes.error}>{props.errorData.Summary}</Typography>}
        </div>
    );
};

ErrorSummary.displayName = 'ErrorSummary';
export default withStyles(styles)(ErrorSummary);