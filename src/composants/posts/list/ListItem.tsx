import React from 'react';
import { withRouter } from 'react-router';
import { observer, useComputed } from 'mobx-react-lite';
import { CardItem, CardsItemGroup } from '../../utils/CardItem';
import { Post } from '../../../types';
import { usePostsStore } from '../../../stores';

const RawListItem: React.FC = observer(() => {
  const postsStore = usePostsStore();
  /*eslint-disable*/
  const items = useComputed(
    () => postsStore.posts.map(getItem)
  );
  /*eslint-enable*/
  return (
    <CardsItemGroup>
      {items}
    </CardsItemGroup>
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