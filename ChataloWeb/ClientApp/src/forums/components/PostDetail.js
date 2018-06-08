import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import green from '@material-ui/core/colors/green';
import Moment from 'react-moment';

import ProfileCard from './ProfileCard';

const styles = theme => ({
    evenDiv: {
        borderRadius: '5px',
        backgroundColor: green[100],
        padding: theme.spacing.unit,
        display: 'flex',
        flexWrap: 'wrap'
    },
    oddDiv: {
        padding: theme.spacing.unit,
        display: 'flex',
        flexWrap: 'wrap'
    },
    text: {
        position: 'relative',
        padding: theme.spacing.unit * 2
    },
    bottomText: {
        position: 'absolute',
        bottom: theme.spacing.unit,
        width:  '400px'
    }
});


const PostDetail = (props) => {
    const { classes } = props;

    return (
        <div className={props.index % 2 === 0 ? classes.evenDiv : classes.oddDiv}>
            <ProfileCard person={props.person} />
            <div className={classes.text}>
                <Typography variant='body2'>{props.message}</Typography>
                <Typography className={classes.bottomText} variant='caption'>{props.person !== undefined ? `${props.person.firstName} ${props.person.lastName}` : 'unknown'}, <Moment format='MMM D, YYYY h:mm A'>{props.date}</Moment> </Typography>
            </div>
        </div>
    );
};

PostDetail.displayName = 'PostDetail';
export default withStyles(styles)(PostDetail);
