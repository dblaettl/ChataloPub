import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Forums';
import BoardRouter from './routers/BoardRouter';
import LoadingIndicator from './components/LoadingIndicator';
import BoardList from './components/BoardList';

class ForumIndex extends Component {
    componentWillMount() {
        this.props.getBoards();
    }

    componentWillReceiveProps(nextProps) {

    }

    renderBoardList = () => {
        return (
            <BoardList boards={this.props.boards} addBoard={this.props.addBoard} />
        );
    }

    render() {
        return (
            <div>
                <LoadingIndicator numLoading={this.props.numLoading} />
                <Switch>
                    <Route exact path='/forums' render={this.renderBoardList} />
                    <Route path='/forums/:boardId' component={BoardRouter} />
                </Switch>
            </div>
        );
    }
}

ForumIndex.displayName = 'ForumIndex';
export default connect(
    state => state.forums,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(ForumIndex);
