﻿import React, { Component } from 'react';
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

    }

    render() {
        return (
            <div>
                {this.props.boards !== null &&
                    this.props.boards.byId.map((item, index) =>
                    <BoardDetail
                        key={item}
                        board={this.props.boards.byHash[item]}
                        categories={this.props.categories}
                        discussions={this.props.discussions}
                        getCategoriesForBoard={this.props.getCategoriesForBoard}
                        getDiscussionsForCategory={this.props.getDiscussionsForCategory}
                    />)}            
            </div>
        );
    }
}
 
ForumController.displayName = 'ForumController';
export default connect(
    state => state.forums,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(ForumController);
