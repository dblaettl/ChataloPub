import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DiscussionListItem from './DiscussionListItem';
import DiscussionPager from './DiscussionPager';

const styles = theme => ({

    category: {
        padding: 6
    }
});

class DiscussionList extends Component {
    componentWillMount() {
        if (this.props.category.discussions === undefined) {
            this.props.getDiscussionsForCategory(this.props.category.boardCategoryId);
        }
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.category}>
                <Typography variant="headline">{this.props.category.name}</Typography>
                <Typography variant="subheading">{this.props.category.description}</Typography>
                {this.props.category !== null
                    && this.props.category.discussions !== undefined
                    && this.props.category.discussions.map((item, index) =>
                    <DiscussionListItem key={item} boardId={this.props.boardId} persons={this.props.persons} categoryId={this.props.category.boardCategoryId} discussion={this.props.discussions.byHash[item]} />
                    )
                }
                <DiscussionPager boardId={this.props.boardId} boardCategoryId={this.props.category.boardCategoryId} />
            </div>
        );
    }
}

 
DiscussionList.displayName = 'DiscussionList';
export default withStyles(styles)(DiscussionList);
