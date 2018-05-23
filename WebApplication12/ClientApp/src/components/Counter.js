import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Counter';

const Counter = props => 
  <div>
    <h1>Counter</h1>

    <p>This is a simple example of a React component.</p>

    <p>Current count: <strong>{props.stores.counter.count}</strong></p>

    <button onClick={props.increment}>Increment</button>
  </div>
;
Counter.displayName = 'Counter';

const mapStateToProps = (state) => {
    return { stores: { counter: state.counter } };
};

export default connect(
    state => mapStateToProps(state),
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Counter);
