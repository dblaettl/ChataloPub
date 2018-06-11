import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/Forums';
import CategoryList from '../components/CategoryList';
import CategoryRouter from './CategoryRouter';
/*
 * Routers exist to connect the Higher order components with the redux data store.
 * No display code should ever be here
 */

class BoardRouter extends Component {
    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {

    }


    renderCategoryList = () => {
        const board = this.props.boards.byHash[this.props.match.params.boardId];
        return (
            <div>
                {board !== undefined &&
                <CategoryList
                    categories={this.props.categories}
                    board={board}
                    getCategoriesForBoard={this.props.getCategoriesForBoard}
                    addCategory={this.props.addCategory}
                    showDialog={this.props.showDialog}
                    setShowDialog={this.props.setShowDialog}
                    errorData={this.props.errorData}
                /> 
                }
            </div>
        );
    }

    render() {
        return (
            <Switch>
                <Route exact path='/forums/:boardId' render={this.renderCategoryList} />
                <Route path='/forums/:boardId/categories/:categoryId' component={CategoryRouter} />
            </Switch>         
        );
    }
}
 
BoardRouter.displayName = 'BoardRouter';
export default connect(
    state => state.forums,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(BoardRouter);
