import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Forums';
import BoardRouter from './routers/BoardRouter';
import LoadingIndicator from './components/LoadingIndicator';
import BoardList from './components/BoardList';
import DialogFormContext from './../components/DialogFormContext';

class ForumIndex extends Component {
    componentWillMount() {
        this.props.getBoards();
    }

    componentWillReceiveProps(nextProps) {

    }


    render() {
        const providerValue = { 
            showDialog: this.props.showDialog,
            setShowDialog: this.props.setShowDialog,
            errorData: this.props.errorData
        };
        return (
            <DialogFormContext.Provider value={providerValue}>       
                <LoadingIndicator numLoading={this.props.numLoading} />
                <Switch>
                    <Route exact path='/forums' render={() =>
                        <BoardList boards={this.props.boards} addBoard={this.props.addBoard} />}
                    />
                    <Route path='/forums/:boardId' component={BoardRouter} />
                </Switch>              
            </DialogFormContext.Provider>
        );
    }
}

ForumIndex.displayName = 'ForumIndex';
export default connect(
    state => state.forums,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(ForumIndex);
