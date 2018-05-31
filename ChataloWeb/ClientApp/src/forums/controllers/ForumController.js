import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/Forums';
import BoardDetail from '../components/BoardDetail';

/*
 * Controllers exist to connect the Higher order components with the redux data store.
 * No display code should ever be here
 */

class ForumController extends Component {
    componentWillMount() {
        this.props.getBoards();
    }

    componentWillReceiveProps(nextProps) {
 
 
        nextProps.boards.byId.forEach(boardId => {
            let nextHashItem = nextProps.boards.byHash[boardId];
            let currentHashItem = this.props.boards.byHash[boardId];
            if (currentHashItem === undefined || nextHashItem.categories === undefined) {
                this.props.getCategoriesForBoard(boardId);
            } else {
                nextHashItem.categories.forEach(boardCategoryId => {
                    let nextcategory = nextProps.categories.byHash[boardCategoryId];
                    let thiscategory = this.props.categories.byHash[boardCategoryId];
                    if (thiscategory === undefined || nextcategory.discussions === undefined) {
                        this.props.getDiscussionsForCategory(boardCategoryId);
                    } 
                });
            }
        });
    }

    render() {
        return (
            <div>
                {this.props.boards !== null &&
                    this.props.boards.byId.map((item, index) => {
                        let hashItem = this.props.boards.byHash[item];
                    return <BoardDetail key={item} board={hashItem} categories={this.props.categories} discussions={this.props.discussions} getCategoriesForBoard={this.getCategoriesForBoard} getDiscussionsForCategory={this.getDiscussionsForCategory} />;
                    }
                    )}            
            </div>
        );
    }
}
 
ForumController.displayName = 'ForumController';
export default connect(
    state => state.forums,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(ForumController);
