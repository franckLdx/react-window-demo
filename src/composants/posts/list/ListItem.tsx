import React, { useMemo } from 'react';
import { Card } from 'semantic-ui-react'
import { useSelector } from 'react-redux';
import { Post } from '../../../types';
import { RouteComponentProps, withRouter } from 'react-router';
import { History } from 'history';
import { getPosts } from '../../../state/selectors';

const RawListItem: React.FC<RouteComponentProps<any>> = ({ history, match }) => {
  const posts = useSelector(getPosts);
  const items = useMemo(
    () => posts.map(post => toItem(post, history, match.url)),
    [posts, history, match.url]
  );

  return <Card.Group centered items={items} />;
}

const toItem = ({ id, title, body }: Post, history: History<any>, url: string) => ({
  header: title,
  description: body,
  link: true,
  onClick: () => history.push(`${url}/${id}`)
});

export const ListItem = withRouter(RawListItem);