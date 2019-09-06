import React from "react";
import { Header } from "semantic-ui-react";
import { HomePageButton } from "../HomePageButton";

export const ErrorPage: React.FC = () => (
  <>
    <Header color="blue">
      Oups, sorry,
        Something wrong happened
    </Header>
    <HomePageButton />
  </>
);