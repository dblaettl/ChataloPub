import React from 'react';
import { Route, Switch } from 'react-router';
import PersonDetailController from './controllers/PersonDetailController';
import PersonPageController from './controllers/PersonPageController';

/*
 * The Router is solely responsible to pointing to the correct component depending on the path - this is where modules could be implemented as well
 */

const PersonRouter = (props) =>
    <Switch>
        <Route path='/persons/detail/:id?' component={PersonDetailController} />
        <Route path='/persons/:offset?/:limit?' component={PersonPageController} />
    </Switch>;

PersonRouter.displayName = 'PersonRouter';
export default PersonRouter;
