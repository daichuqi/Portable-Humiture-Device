'use strict';
import React from 'react';
import {Route,DefaultRoute,NotFoundRoute} from 'react-router';
import Layout from './layout';
import Home from './home';
import NotFound from './notfound';
import Control from './control';


const routes = (
  <Route handler={Layout}>
    <DefaultRoute name="home" handler={Home}/>
    <Route name="control" path="/control" handler={Control}/>
    <NotFoundRoute name="not-found" handler={NotFound}/>
  </Route>
);

export default routes;
