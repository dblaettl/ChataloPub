import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import green from '@material-ui/core/colors/green';
import Moment from 'react-moment';
const styles = theme => ({
    evenDiv: {
        backgroundColor: green[100],
        padding: theme.spacing.unit,
        overflow: 'hidden'
    },
    oddDiv: {
        overflow: 'hidden',
        padding: theme.spacing.unit
    },
    avatar: {
        float: 'left',
        backgroundColor: theme.palette.primary.dark,
        margin: theme.spacing.unit
    },
    text: {
        padding: theme.spacing.unit
    },
    floating: {
        float: 'right'
    }
});


const PostDetail = (props) => {
    const { classes } = props;

    return (
        <div className={props.index % 2 === 0 ? classes.evenDiv : classes.oddDiv}>
            <Avatar className={classes.avatar}>{props.user.charAt(0).toUpperCase()}</Avatar>
            <div className={classes.text}>
                <Typography variant='body2'>{props.message}</Typography>
                <Typography variant='caption' >{props.user} - <Moment format='MMM DD, YYYY HH:mm A'>{props.date}</Moment> </Typography>
            </div>
        </div>
    );
};

PostDetail.displayName = 'PostDetail';
export default withStyles(styles)(PostDetail);
