import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, IconButton } from '@material-ui/core';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
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
            <IconButton
                aria-label="Next"
                component={Link}
                className={classes.rightButton}
                to={`/forums/${props.boardId}/categories/${props.boardCategoryId}/page`}
            >
                <ArrowForward />
            </IconButton>
            <IconButton
                aria-label="Prev"
                component={Link}
                to={`/forums/${props.boardId}/categories/${props.boardCategoryId}/page`}
            >
                <ArrowBack />
            </IconButton>
        </Paper>
    );
};
DiscussionPager.displayName = 'DiscussionPager';
export default withStyles(styles)(DiscussionPager);
