import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Chat';
import LoadingIndicator from '../forums/components/LoadingIndicator';
import ChatBoard from './components/ChatBoard';

class ChatIndex extends Component {
    componentWillMount() {
        this.props.joinChat();
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {
        this.props.leaveChat();
    }

    render() {
        return (
             <div>
                <LoadingIndicator numLoading={this.props.numLoading} />
                <ChatBoard messages={this.props.messages} />
             </div>  
        );
    }
}

ChatIndex.displayName = 'ChatIndex';
export default connect(
    state => state.chat,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(ChatIndex);
