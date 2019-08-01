import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import Layout from './Layout';

function MainRouter() {


  return (
    <Router>
      <Switch>
        <Route path="/" render={(props) => {
          return <Layout />
        }} />
      </Switch>
    </Router>
  )
}

export default MainRouter;