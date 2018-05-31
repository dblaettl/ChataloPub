import React from 'react';
import { Route, Switch } from 'react-router';
import Loadable from 'react-loadable';
import Layout from './components/Layout';
import Home from './components/Home';

const Loading = () => <div>Loading...</div>;

const PersonIndex = Loadable({
    loader: () => import('./persons'),
    loading: Loading,
});

const ForumIndex = Loadable({
    loader: () => import('./forums'),
    loading: Loading,
});

const Lay = () =>
    <Layout>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/persons' component={PersonIndex} />
            <Route path='/forums' component={ForumIndex} />
        </Switch>
    </Layout>;
Lay.displayName = 'Layout';
export default Lay;
