import React from "react";
import { Message } from "semantic-ui-react";
import { RouteComponentProps, withRouter } from "react-router";
import { HomePageButton } from "../utils/HomePageButton";

const RawPageNotFound: React.FC<RouteComponentProps<any>> = ({ location }) => (
  <>
    <Message negative>
      <Message.Header>Oups, sorry</Message.Header>
      <p />
      <p>No Page found for path<code>{location.pathname}</code></p>
    </Message>
    <HomePageButton />
  </>
);

export default withRouter(RawPageNotFound);