import React from 'react';
import { Route, Switch } from 'react-router';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';


const AccountIndex = (props) => 
    <Switch>
        <Route path='/account/login' component={LoginForm} />
        <Route path='/account/register' component={RegisterForm} />
    </Switch>;

AccountIndex.displayName = 'AccountIndex';
export default AccountIndex;
