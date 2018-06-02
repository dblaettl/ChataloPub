import React, { Component } from 'react';
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


class BoardDetail extends Component {
    componentWillMount() {
        if (this.props.board.categories === undefined) {
            this.props.getCategoriesForBoard(this.props.board.boardId);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.board.categories === undefined) {
            this.props.getCategoriesForBoard(nextProps.board.boardId);
        } 
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <AppBar position='static' color='default'>
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.flex}>{this.props.board.name}</Typography>
                        <IconButton className={classes.button} aria-label="Add" component={NavLink} to={`/forums/1/categories`} >
                            <Add />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                {this.props.board.categories !== undefined && this.props.board.categories.map((item, index) => <CategoryDetail key={item} boardId={this.props.board.boardId} getDiscussionsForCategory={this.props.getDiscussionsForCategory} discussions={this.props.discussions} category={this.props.categories.byHash[item]} />)}
            </div>
        );
    }
}


BoardDetail.displayName = 'BoardDetail';
export default withStyles(styles)(BoardDetail);
