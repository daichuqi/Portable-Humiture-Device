'use strict';
import React from 'react';
import {Route,DefaultRoute,NotFoundRoute} from 'react-router';
import Layout from './layout';
import Home from './home';
import NotFound from './notfound';
import Whoweare from './whoweare';


const routes = (
  <Route handler={Layout}>
    <DefaultRoute name="home" handler={Home}/>
    <Route name="who" path="/who" handler={Whoweare}/>
    <NotFoundRoute name="not-found" handler={NotFound}/>
  </Route>
);

export default routes;
