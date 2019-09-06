import React from "react";
import { Route_Home, Route_Posts, Route_Not_Found, Route_Error } from "./routes";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { PageNotFound } from "./pages";
import { PostsList, PostDetail } from "./posts";

export const Main: React.FC = () => (
  <Router>
    <Switch>
      <Redirect exact from={Route_Home} to={Route_Posts} />
      <Route exact path={Route_Posts} component={PostsList} />
      <Route exact path={`${Route_Posts}/:postId`} render={
        props => {
          const postId = parseInt(props.match.params.postId, 10);
          return <PostDetail postId={postId} />;
        }
      } />
      <Route exact path={Route_Not_Found} component={PageNotFound} />
      <Route exact path={Route_Error} component={PageNotFound} />
      <Redirect to={Route_Not_Found} />
    </Switch>
  </Router>
);
