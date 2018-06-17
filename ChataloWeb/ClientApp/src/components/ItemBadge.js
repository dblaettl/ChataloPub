import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    badge: {
        margin: theme.spacing.unit,
        textAlign: 'center'
    },
});

const ItemBadge = (props) => {
    const { classes } = props;

    return (
        <div className={classes.badge}>
            {props.icon}
            <Typography variant="subheading" color="textSecondary">
                {props.text}
            </Typography>
        </div>
    );
};

ItemBadge.displayName = 'ItemBadge';
export default withStyles(styles)(ItemBadge);