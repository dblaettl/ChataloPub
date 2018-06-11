import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
    avatar: {
        marginTop: theme.spacing.unit * 2,
        margin: theme.spacing.unit
    }
});


const PersonAvatar = (props) => {
    const { classes } = props;
    return (
        <div>
            {props.person !== undefined &&
                <Avatar className={classes.avatar}>{props.person.firstName.charAt(0).toUpperCase() + props.person.lastName.charAt(0).toUpperCase()}</Avatar>
            }
        </div>
        );
};
PersonAvatar.displayName = 'PersonAvatar';
export default withStyles(styles)(PersonAvatar);
