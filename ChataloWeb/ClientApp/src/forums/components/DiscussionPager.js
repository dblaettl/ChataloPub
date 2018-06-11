import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Add } from '@material-ui/icons';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';

const styles = theme => ({
    rightButton: {
        float: 'right'
    },
    paper: {
        overflow: 'hidden'
    }
});


const DiscussionPager = (props) => {
    const { classes } = props;

    return (
        <Paper className={classes.paper}>
            <IconButton className={classes.rightButton}
                aria-label="Add"
                component={Link}
                to={`/forums/${props.boardId}/categories/${props.boardCategoryId}/adddiscussion`}
            >
                <Add />
            </IconButton>
            <IconButton
                aria-label="Prev"
                component={Link}
                to={`/forums/${props.boardId}/categories/${props.boardCategoryId}/page`}
            >
                <ArrowBack />
            </IconButton>
            <IconButton
                aria-label="Next"
                component={Link}
                to={`/forums/${props.boardId}/categories/${props.boardCategoryId}/page`}
            >
                <ArrowForward />
            </IconButton>
        </Paper>
    );
};
DiscussionPager.displayName = 'DiscussionPager';
export default withStyles(styles)(DiscussionPager);
