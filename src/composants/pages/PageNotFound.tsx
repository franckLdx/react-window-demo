import React from "react";
import { Header } from "semantic-ui-react";
import { RouteComponentProps, withRouter } from "react-router";
import { HomePageButton } from "../utils/HomePageButton";

const RawPageNotFound: React.FC<RouteComponentProps<any>> = ({ location }) => (
  <>
    <Header color="blue">
      Oups, sorry,
        No Page found for path<code>{location.pathname}</code>
    </Header>
    <HomePageButton />
  </>
);

export const PageNotFound = withRouter(RawPageNotFound);