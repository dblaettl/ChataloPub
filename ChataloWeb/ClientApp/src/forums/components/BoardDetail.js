import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import { Add } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CategoryDetail from './CategoryDetail';
const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    },
    flex: {
        flex: 1
    },
    table: {
        minWidth: 700
    },
    chipDiv: {
        padding: 6
    }
});


const BoardDetail = (props) => {
    const { classes } = props;
 
    return (
        <div>
        <AppBar position='static' color='default'>
            <Toolbar>
                <Typography variant="title" color="inherit" className={classes.flex}>{props.board.name}</Typography>
                <IconButton className={classes.button} aria-label="Add" component={NavLink} to={`/forums/1/categories`} >
                    <Add />
                </IconButton>
            </Toolbar>
        </AppBar>
            {props.board.categories !== undefined && props.board.categories.map((item, index) => <CategoryDetail key={index} boardId={props.board.boardId} discussions={props.discussions} category={props.categories.byHash[item]} />)}
        </div>
    );
};

BoardDetail.displayName = 'BoardDetail';
export default withStyles(styles)(BoardDetail);
