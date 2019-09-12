import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PageNotFound } from "./pages";
import { PostsList, PostDetail } from "./posts";
import { ErrorCatcher } from "./ErrorCatcher";

export const Main: React.FC = () => (
  <Router>
    <ErrorCatcher>
      <Switch>
        <Route exact path='/' component={PostsList} />
        <Route exact path={'/error'} component={PageNotFound} />
        <Route exact path='/:postId' render={
          props => {
            const postId = parseInt(props.match.params.postId, 10);
            return <PostDetail postId={postId} />;
          }
        } />
        <Route component={PageNotFound} />
      </Switch>
    </ErrorCatcher>
  </Router >
);
