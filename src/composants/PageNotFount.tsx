import React, { useCallback } from "react";
import { Button, Icon, Header } from "semantic-ui-react";
import { RouteComponentProps } from "react-router";
import { Home } from "./routes";

export const PageNotFound: React.FC<RouteComponentProps<any>> = ({ location, history }) => {
  const goHome = useCallback(() => history.push(Home), [history]);
  return (
    <>
      <Header color="blue">
        Oups, sorry,
        No Page found for path<code>{location.pathname}</code>
      </Header>
      <Button primary icon labelPosition='left' onClick={goHome}>
        <Icon name='home' />
        Click to go back to application
      </Button>
    </>
  )
};