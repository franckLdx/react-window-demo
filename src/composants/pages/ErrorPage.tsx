import React from "react";
import { Message } from "semantic-ui-react";
import { HomePageButton } from "../utils/HomePageButton";

export const ErrorPage: React.FC = () => (
  <>
    <Message negative>
      <Message.Header>Oups, sorry</Message.Header>
      <p />
      <p>Something wrong happened, better luck next time</p>
    </Message>
    <HomePageButton />
  </>
);