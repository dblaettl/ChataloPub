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
        // we're getting this board for the first time
        if (nextProps.boards !== this.props.boards) {
            nextProps.boards.byId.forEach(boardId => {
                let hashItem = nextProps.boards.byHash[boardId];
                let currentHashItem = this.props.boards.byHash[boardId];
                if (hashItem.categories === undefined || currentHashItem === undefined) {
                    this.props.getCategoriesForBoard(boardId);
                } else {
                    hashItem.categories.forEach(id => {
                        if (currentHashItem !== undefined) {
                            let currentCategoryHash = this.props.categories.byHash[id];
                            if (currentCategoryHash === undefined || currentCategoryHash.discussions === undefined) {
                                this.props.getDiscussionsForCategory(id, 0, 10);
                            }
                        }
                    });
                }
            });
        }
        else
        {
            nextProps.boards.byId.forEach(boardId => {
                let hashItem = nextProps.boards.byHash[boardId];
                let currentHashItem = this.props.boards.byHash[boardId];
                if (hashItem.categories === undefined || currentHashItem === undefined) {
                    this.props.getCategoriesForBoard(boardId);
                } else {     
                    hashItem.categories.forEach(id => {
                        if (currentHashItem !== undefined) {
                            let currentCategoryHash = this.props.categories.byHash[id];
                            if (currentCategoryHash === undefined || currentCategoryHash.discussions === undefined) {
                                this.props.getDiscussionsForCategory(id, 0, 10);
                            }
                        }
                    });
                }
            });
        }
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
