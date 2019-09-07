import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { getPosts } from '../../../state';
import { CardItem } from '../../utils/CardItem';
import { Card } from 'semantic-ui-react';

const RawListItem: React.FC<RouteComponentProps<any>> = (routeProps) => {
  const posts = useSelector(getPosts);
  const items = useMemo(
    () => posts.map(({ id, title, body }) =>
      <CardItem
        key={id}
        header={title}
        description={body}
        url={`${id}`}
      />),
    [posts]
  );
  return (
    <Card.Group id="foo">
      {items}
    </Card.Group>
  );
}

export const ListItem = withRouter(RawListItem);