import React, { useCallback } from 'react';
import { Card } from 'semantic-ui-react';
import { withRouter, RouteComponentProps } from 'react-router';
import { useWindowSize, breakpoints } from './media';

interface CardItemProps {
  header: string;
  description: string;
  url?: string
}
const RawCardItem: React.FC<CardItemProps & RouteComponentProps<any>> = ({ header, description, url, history }) => {
  const onClick = useCallback(() => history.push(url || ''), [url, history]);
  return (
    <Card style={{ animation: `fadeIn ${300 + Math.floor(Math.random() * 800)}ms linear` }} color='orange' link={url !== undefined} onClick={url ? onClick : undefined}>
      <Card.Content>
        <Card.Header>{header}</Card.Header>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
    </Card>
  );
}

export const CardItem = withRouter(RawCardItem);

export const CardsItemGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const cardsPerRows = useCardItemPerRow();
  return (
    <Card.Group itemsPerRow={cardsPerRows}>
      {children}
    </Card.Group>
  );
}

function useCardItemPerRow() {
  const { width } = useWindowSize();
  if (width < breakpoints.tablet) { return 1 }
  if (width < breakpoints.laptopL) { return 2 }
  return 3;
}