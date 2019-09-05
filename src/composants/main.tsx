import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { PostsList } from "./PostsList";
import { PageNotFound } from "./PageNotFount";
import { Home, Posts } from "./routes";

export const Main: React.FC = () => (
  <Router>
    <Switch>
      <Redirect exact from={Home} to={Posts} />
      <Route path={Posts} exact component={PostsList} />
      <Route render={props => <PageNotFound {...props} />} />
    </Switch>
  </Router>
);