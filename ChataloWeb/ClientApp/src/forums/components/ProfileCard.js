import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Moment from 'react-moment';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

const styles = theme => ({
    [theme.breakpoints.up('sm')]: {
        card: {
            borderRadius: '10px',
            textAlign: 'center',
            width: '120px',
            justifyContent: 'center',
            padding: '5px',
            color: theme.palette.secondary.dark,
            borderColor: theme.palette.secondary.main,
            borderWidth: '2px',
            backgroundColor: 'white',
            borderStyle: 'solid'
        }
    },
    [theme.breakpoints.down('xs')]:
        {
            card: {

            }
        },
    text: {
        color: theme.palette.secondary.dark
    },
    avatar: {      
        marginLeft: 32,
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main
    }
});


const ProfileCard = (props) => {
    const { classes } = props;

    return (
        <div className={classes.card}>
            {props.person !== undefined && isWidthUp('sm', props.width) && <Typography variant='body2'>{props.person.firstName} {props.person.lastName}</Typography>}
            {props.person !== undefined && <div style={{ width: '100%', justifyContent: 'center' }}><Avatar className={classes.avatar}>{props.person.firstName.charAt(0).toUpperCase() + props.person.lastName.charAt(0).toUpperCase()}</Avatar></div>}
            {props.person !== undefined && isWidthUp('sm', props.width) && <Typography variant='body2' className={classes.text}><Moment format='MMM D, YYYY'>{props.person.dateCreated}</Moment></Typography>}
        </div>
    );
};
ProfileCard.displayName = 'ProfileCard';
export default withWidth()(withStyles(styles)(ProfileCard));
