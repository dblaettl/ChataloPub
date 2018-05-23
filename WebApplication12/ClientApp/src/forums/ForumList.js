import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Counter';

const ForumList = props =>
    <div>
        <h1>Forums</h1>
         These Are the Forums!
    </div>
    ;
ForumList.displayName = 'ForumList';

const mapStateToProps = (state) => {
    return { stores: { counter: state.counter } };
};

export default connect(
    state => mapStateToProps(state),
    dispatch => bindActionCreators(actionCreators, dispatch)
)(ForumList);
