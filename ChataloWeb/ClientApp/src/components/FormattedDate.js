import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    }
});

const FormattedDate = (props) => {
    const { classes } = props;

    return (
        <span>{props.date}</span>
    );
};

FormattedDate.displayName = 'FormattedDate';
export default withStyles(styles)(FormattedDate);