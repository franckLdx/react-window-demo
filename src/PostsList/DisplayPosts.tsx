import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Card } from 'semantic-ui-react'
import { useSelector } from 'react-redux';
import { Post } from '../types';
import { AppState } from '../state';

const MyContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 10px;
`;

export const DisplayPosts: React.FC = () => {
  const posts = useSelector<AppState, Post[]>(state => state.posts.posts);
  const items = useMemo(
    () => posts.map(({ title, body }) => ({
      header: title,
      description: body
    })),
    [posts]
  );
  return (
    <MyContainer>
      <Card.Group centered items={items} />
    </MyContainer>
  )
}
