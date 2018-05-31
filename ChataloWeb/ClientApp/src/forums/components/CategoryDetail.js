import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper  from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Add } from '@material-ui/icons';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import DiscussionDetail from './DiscussionDetail';

const styles = theme => ({
    rightButton: {
         float: 'right' 
    },
    paper: {
        overflow: 'hidden'
    },
    chipDiv: {
        padding: 6
    }
});


const CategoryDetail = (props) => {
    const { classes } = props;
 
    return (
        <div className={classes.chipDiv}>
           <Typography variant="headline">{props.category.name}</Typography>
            <Typography variant="subheading">{props.category.description}</Typography>
            {props.category !== null && props.category.discussions !== undefined && props.category.discussions.map((item, index) => <DiscussionDetail key={index} boardId={props.boardId} categoryId={props.category.boardCategoryId} discussion={props.discussions.byHash[item]} />)}

            <Paper className={classes.paper}>
                <IconButton className={classes.rightButton} aria-label="Add" component={Link} to={`/forums/${props.boardId}/categories/${props.category.boardCategoryId}/discussions`} >
                    <Add />
                </IconButton>
                <IconButton aria-label="Prev" component={Link} to={`/forums/${props.boardId}/categories/${props.category.boardCategoryId}/page`} >
                    <ArrowBack />
                </IconButton>
                <IconButton aria-label="Next" component={Link} to={`/forums/${props.boardId}/categories/${props.category.boardCategoryId}/page`} >
                    <ArrowForward />
                </IconButton>
            </Paper>
        </div>
        );
};

CategoryDetail.displayName = 'CategoryDetail';
export default withStyles(styles)(CategoryDetail);
