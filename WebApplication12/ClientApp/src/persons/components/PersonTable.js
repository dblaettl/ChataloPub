import React from 'react';
import Table from '@material-ui/core/Table';
import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { NavLink } from 'react-router-dom';
import { Add } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit

    },
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white
    },
    flex: {
        flex: 1
    },
    table: {
        minWidth: 700
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default
        }
    }
});


function PersonTable(props) {
    const { classes } = props;
    return (
        <div>
            <AppBar position='static' color='default'>
                <Toolbar>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                       People
            </Typography>
                    <IconButton className={classes.button} aria-label="Add" component={NavLink} to='/persons/detail' >
                        <Add />
                    </IconButton>
                     
                </Toolbar>
            </AppBar>
            {props.isLoading ? <div style={{ height: 294, width: '100%', alignItems: 'center' }}><CircularProgress style={{ alignItems: 'center' }} size={50} thickness={7} /></div>
                : <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.head}>First Name</TableCell>
                        <TableCell className={classes.head}>Last Name</TableCell>
                        <TableCell className={classes.head}>Email</TableCell>
                        <TableCell className={classes.head}>City</TableCell>
                        <TableCell className={classes.head}>State</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.persons.map(person =>
                        <TableRow key={person.personId} className={classes.row} >
                            <TableCell><NavLink to={`/persons/detail/${person.personId}`}>{person.firstName}</NavLink></TableCell>
                            <TableCell>{person.lastName}</TableCell>
                            <TableCell>{person.email}</TableCell>
                            <TableCell>{person.city}</TableCell>
                            <TableCell >{person.state}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
                </Table>
            }
            </div>
    );
}

PersonTable.displayName = 'PersonTable';
export default withStyles(styles)(PersonTable);
