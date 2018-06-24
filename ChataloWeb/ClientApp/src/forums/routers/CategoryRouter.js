import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/Forums';
import DiscussionRouter from './DiscussionRouter';
import DiscussionList from '../components/DiscussionList';

/*
 * Routers exist to connect the Higher order components with the redux data store.
 * No display code should ever be here
 */

class CategoryRouter extends Component {
    componentWillMount() {
        
        let categoryId = this.props.match.params.categoryId;
        let boardId = this.props.match.params.boardId;
        if (categoryId) {
            let category = this.props.categories.byHash[categoryId];
            if (category === undefined) {
                this.props.getCategoriesForBoard(boardId);
            } else if (category.discussions === undefined) {
                this.props.getDiscussionsForCategory(categoryId);
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        let categoryId = this.props.match.params.categoryId;
        let nextCategory = nextProps.categories.byHash[categoryId];
        if (nextCategory !== undefined && nextCategory.discussions === undefined && nextProps.numLoading === 0)
        {
            this.props.getDiscussionsForCategory(categoryId);
        }
    }

    renderDiscussionList = () => {
        const category = this.props.categories.byHash[this.props.match.params.categoryId];
        return (
            <div>
                {category &&
                <DiscussionList
                    category={category}
                    persons={this.props.persons}
                    discussions={this.props.discussions}
                    addDiscussion={this.props.addDiscussion}
                    getDiscussionsForCategory={this.props.getDiscussionsForCategory}
                />
                }
            </div>
        );
 
    }

    render() {
        return (
            <Switch>
                <Route exact path='/forums/:boardId/categories/:categoryId' render={this.renderDiscussionList} />
                <Route path='/forums/:boardId/categories/:categoryId/discussions/:discussionId' component={DiscussionRouter} />
            </Switch>
        );
    }
}
 
CategoryRouter.displayName = 'CategoryRouter';
export default connect(
    state => state.forums,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(CategoryRouter);
