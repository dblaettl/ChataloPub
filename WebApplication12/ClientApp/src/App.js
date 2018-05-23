import React from 'react';
import { Route, Switch } from 'react-router';
import Loadable from 'react-loadable';
import Layout from './components/Layout';
import Home from './components/Home';

const Loading = () => <div>Loading...</div>;

const Counter = Loadable({
    loader: () => import('./components/Counter'),
    loading: Loading,
});

const PersonIndex = Loadable({
    loader: () => import('./persons'),
    loading: Loading,
});

const ForumController = Loadable({
    loader: () => import('./forums'),
    loading: Loading,
});

const Lay = () =>
    <Layout>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/counter' component={Counter} />
            <Route path='/persons' component={PersonIndex} />
            <Route path='/forums' component={ForumController} />
        </Switch>
    </Layout>;
Lay.displayName = 'Layout';
export default Lay;
