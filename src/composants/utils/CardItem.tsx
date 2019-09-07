import React, { useCallback } from 'react';
import { Card } from 'semantic-ui-react';
import { withRouter, RouteComponentProps } from 'react-router';

interface CardItemProps {
  header: string;
  description: string;
  url?: string
}
const RawCardItem: React.FC<CardItemProps & RouteComponentProps<any>> = ({ header, description, url, history }) => {
  const onClick = useCallback(() => history.push(url || ''), [url, history]);
  return (
    <Card fluid color='orange' link={url !== undefined} onClick={url ? onClick : undefined}>
      <Card.Content>
        <Card.Header>{header}</Card.Header>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
    </Card>
  );
}

export const CardItem = withRouter(RawCardItem);