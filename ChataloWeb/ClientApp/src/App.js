import React from 'react';
import { Route, Switch } from 'react-router';
import Loadable from 'react-loadable';
import Layout from './components/Layout';
import Home from './components/Home';
import AuthRoute from './components/AuthRoute';

const Loading = () => <div>Loading...</div>;

const PersonIndex = Loadable({
    loader: () => import('./persons'),
    loading: Loading,
});

const ForumIndex = Loadable({
    loader: () => import('./forums'),
    loading: Loading,
});

const AccountIndex = Loadable({
    loader: () => import('./account'),
    loading: Loading,
});

const ChatIndex = Loadable({
    loader: () => import('./chat'),
    loading: Loading,
});

const Lay = () =>
    <Layout>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/forums' component={ForumIndex} />
            <AuthRoute path='/chat' component={ChatIndex} />
            <Route path='/account' component={AccountIndex} />
        </Switch>
    </Layout>;
Lay.displayName = 'Layout';
export default Lay;
