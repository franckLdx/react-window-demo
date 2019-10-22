import React from 'react';
import { Card } from 'semantic-ui-react';
import { RouteComponentProps, withRouter } from 'react-router';
import { observer, useComputed } from 'mobx-react-lite';
import { CardItem } from '../../utils/CardItem';
import { Post } from '../../../types';
import { usePostsStore } from '../../../stores';

const RawListItem: React.FC<RouteComponentProps<any>> = observer((routeProps) => {
  const postsStore = usePostsStore();
  /*eslint-disable*/
  const items = useComputed(
    () => postsStore.posts.map(post => getItem(post))
  );
  /*eslint-enable*/
  return (
    <Card.Group id="Posts">
      {items}
    </Card.Group>
  );
})

const getItem = (post: Post) =>
  <CardItem
    key={post.id}
    header={post.title}
    description={post.body}
    url={`${post.id}`}
  />


export const ListItem = withRouter(RawListItem);