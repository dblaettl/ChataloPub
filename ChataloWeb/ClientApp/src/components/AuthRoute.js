/* eslint react/no-multi-comp: 0 */
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Account';

const AuthRoute = ({ component: ComposedComponent, ...rest }) => {
    class Authentication extends Component {
        // redirect if not authenticated; otherwise, return the component imputted into <PrivateRoute />
        handleRender(props) {
            if (!this.props.isLoggedIn) {
                return (
                    <Redirect to={{
                        pathname: '/account/login',
                        state: {
                            from: props.location,
                            message: 'You need to sign in'
                        }
                    }}
                    />
                );
            } else {
                return <ComposedComponent {...props} />;
            }
        }

        render() {
            return <Route {...rest} render={this.handleRender.bind(this)} />;
        }
    }
  
    Authentication.displayName = 'Authentication';
    const AuthenticationContainer = connect(
        state => state.account,
        dispatch => bindActionCreators(actionCreators, dispatch)
    )(Authentication);
    return <AuthenticationContainer />;
};

AuthRoute.displayName = 'AuthRoute';
export default AuthRoute;