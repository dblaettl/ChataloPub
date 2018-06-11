import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    circularProgress: {
        alignItems: 'center'
    },
    progressContainer: {
        height: 294,
        width: '100%',
        alignItems: 'center'
    }
});


const LoadingIndicator = (props) => {
    const { classes } = props;

    return (
        <div>
            {props.numLoading > 0 && <div className={classes.progressContainer}><CircularProgress className={classes.circularProgress} size={50} thickness={7} /></div>}
        </div>
    );
};
LoadingIndicator.displayName = 'LoadingIndicator';
export default withStyles(styles)(LoadingIndicator);