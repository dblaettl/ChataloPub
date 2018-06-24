import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
    chip: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
        color: 'white'
    }
});


const PersonChip = (props) => {
    const { classes } = props;
    return <Chip className={classes.chip} label={props.person && `${props.person.firstName} ${props.person.lastName}`} />;
 
};
PersonChip.displayName = 'PersonChip';
export default withWidth()(withStyles(styles)(PersonChip));
