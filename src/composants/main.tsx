import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ErrorCatcher } from "./ErrorCatcher";
import { Loading } from "./utils/Loading";
import { PostsList, PostDetail } from "./posts";
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));
const PageNotFound = React.lazy(() => import("./pages/PageNotFound"));

export const Main: React.FC = () => (
  <ErrorCatcher>
    <Suspense fallback={<Loading />}>
      <Router>
        <Switch>
          <Route exact path='/' component={PostsList} />
          <Route exact path={'/error'} component={ErrorPage} />
          <Route exact path='/:postId' render={
            props => {
              const postId = parseInt(props.match.params.postId, 10);
              return <PostDetail postId={postId} />;
            }
          } />
          <Route component={PageNotFound} />
        </Switch>
      </Router >
    </Suspense >
  </ErrorCatcher >
);
