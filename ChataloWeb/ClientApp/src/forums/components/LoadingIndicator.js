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


const ProfileCard = (props) => {
    const { classes } = props;

    return (
        <div className={classes.progressContainer}><CircularProgress className={classes.circularProgress} size={50} thickness={7} /></div>
    );
};
ProfileCard.displayName = 'ProfileCard';
export default withStyles(styles)(ProfileCard);