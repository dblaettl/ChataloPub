import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/Forums';
import CategoryList from '../components/CategoryList';
import LoadingIndicator from '../components/LoadingIndicator';
/*
 * Controllers exist to connect the Higher order components with the redux data store.
 * No display code should ever be here
 */

class BoardController extends Component {
    componentWillMount() {
        this.props.getBoards();
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return (
            <div>
                {this.props.numLoading > 0
                    ? <LoadingIndicator/>
                    : this.props.boards.byId.map((item, index) =>
                        <CategoryList
                            key={item}
                            board={this.props.boards.byHash[item]}
                            categories={this.props.categories}
                            persons={this.props.persons}
                            discussions={this.props.discussions}
                            getCategoriesForBoard={this.props.getCategoriesForBoard}
                            getDiscussionsForCategory={this.props.getDiscussionsForCategory}
                        />)}            
            </div>
        );
    }
}
 
BoardController.displayName = 'BoardController';
export default connect(
    state => state.forums,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(BoardController);
