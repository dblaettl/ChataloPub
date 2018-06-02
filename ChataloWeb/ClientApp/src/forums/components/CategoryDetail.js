import React, { Component } from 'react';
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

class CategoryDetail extends Component {
    componentWillMount() {
        if (this.props.category.discussions === undefined) {
            this.props.getDiscussionsForCategory(this.props.category.boardCategoryId);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.category.discussions === undefined) {
            this.props.getDiscussionsForCategory(nextProps.category.boardCategoryId);
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.chipDiv}>
                <Typography variant="headline">{this.props.category.name}</Typography>
                <Typography variant="subheading">{this.props.category.description}</Typography>
                {this.props.category !== null && this.props.category.discussions !== undefined && this.props.category.discussions.map((item, index) => <DiscussionDetail key={item} boardId={this.props.boardId} categoryId={this.props.category.boardCategoryId} discussion={this.props.discussions.byHash[item]} />)}

                <Paper className={classes.paper}>
                    <IconButton className={classes.rightButton} aria-label="Add" component={Link} to={`/forums/${this.props.boardId}/categories/${this.props.category.boardCategoryId}/discussions`} >
                        <Add />
                    </IconButton>
                    <IconButton aria-label="Prev" component={Link} to={`/forums/${this.props.boardId}/categories/${this.props.category.boardCategoryId}/page`} >
                        <ArrowBack />
                    </IconButton>
                    <IconButton aria-label="Next" component={Link} to={`/forums/${this.props.boardId}/categories/${this.props.category.boardCategoryId}/page`} >
                        <ArrowForward />
                    </IconButton>
                </Paper>
            </div>
        );
    }
}

 
CategoryDetail.displayName = 'CategoryDetail';
export default withStyles(styles)(CategoryDetail);
