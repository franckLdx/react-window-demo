import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Card } from 'semantic-ui-react'
import { useSelector } from 'react-redux';
import { Post } from '../../types';
import { AppState } from '../../state';
import { RouteComponentProps } from 'react-router';
import { Posts } from '../routes';

const MyContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 10px;
`;


export const DisplayPosts: React.FC<RouteComponentProps<any>> = ({ history }) => {
  const posts = useSelector<AppState, Post[]>(state => state.posts.posts);
  const items = useMemo(
    () => posts.map(({ id, title, body }) => ({
      header: title,
      description: body,
      link: true,
      onClick: () => history.push(`${Posts}/${id}`)
    })),
    [posts]
  );
  return (
    <MyContainer>
      <Card.Group centered items={items} />
    </MyContainer>
  )
}
