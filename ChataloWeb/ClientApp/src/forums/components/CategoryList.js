import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import { Add } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import DiscussionList from './DiscussionList';
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


class CategoryList extends Component {
    componentWillMount() {
        if (this.props.board.categories === undefined) {
            this.props.getCategoriesForBoard(this.props.board.boardId);
        }
    }

    componentWillReceiveProps(nextProps) {
 
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <AppBar position='static' color='default'>
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.flex}>{this.props.board.name}</Typography>
                        <IconButton className={classes.button} aria-label="Add" component={NavLink} to={`/forums/${this.props.board.boardId}/categories/add`} >
                            <Add />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                {this.props.board.categories !== undefined
                    && this.props.board.categories.map((item, index) =>
                    <DiscussionList
                            key={item}
                            boardId={this.props.board.boardId}
                            getDiscussionsForCategory={this.props.getDiscussionsForCategory}
                            discussions={this.props.discussions}
                            persons={this.props.persons}
                            category={this.props.categories.byHash[item]}
                        />
                    )
                }
            </div>
        );
    }
}


CategoryList.displayName = 'CategoryList';
export default withStyles(styles)(CategoryList);
