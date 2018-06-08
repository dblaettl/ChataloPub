import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Moment from 'react-moment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
    card: {
        borderRadius: '10px',
        textAlign: 'center'
    },
    avatar: {
        marginLeft: 25, /* fake centering for now */
        margin: theme.spacing.unit
    }
});


const ProfileCard = (props) => {
    const { classes } = props;

    return (
        <Card className={classes.card}>
            {props.person !== undefined
                ? <CardContent>
                    <Avatar className={classes.avatar}>{props.person.firstName.charAt(0).toUpperCase() + props.person.lastName.charAt(0).toUpperCase()}</Avatar>
                    <Typography variant='body2'>
                        {props.person.firstName} {props.person.lastName}
                    </Typography>
                    <Typography variant='body2'>
                        <Moment format='MMM D, YYYY'>{props.person.dateCreated}</Moment>
                    </Typography>
                </CardContent>
                : <CardContent>
                    <Avatar className={classes.avatar}>?</Avatar>
                </CardContent>
            }
        </Card>
    );
};
ProfileCard.displayName = 'ProfileCard';
export default withStyles(styles)(ProfileCard);
