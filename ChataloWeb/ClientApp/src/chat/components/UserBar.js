import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PersonChip from './PersonChip';
import Paper from '@material-ui/core/Paper';
const styles = theme => ({
    container: {
        padding: theme.spacing.unit
    }
});

function UserBar(props) {
    const { classes } = props;
    return (
        <Paper className={classes.container}>
                {props.persons.byId.map((item, index) => <PersonChip key={item} person={props.persons.byHash[item]} />)}
        </Paper>
    );
}

UserBar.displayName = 'UserBar';
export default withStyles(styles)(UserBar);