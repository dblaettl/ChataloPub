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
        let id = this.props.match.params.boardId;
        if (id) {
            this.props.getCategoriesForBoard(id);
        }
    }

    componentWillReceiveProps(nextProps) {
 
    }


    renderCategoryList = () => {
        const board = this.props.boards.byHash[this.props.match.params.boardId];
        return (
            <div>
                {board &&
                    <CategoryList
                        categories={this.props.categories}
                        board={board}
                        addCategory={this.props.addCategory}
                        getCategoriesForBoard={this.props.getCategoriesForBoard}
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
