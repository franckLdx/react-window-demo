import React, { useCallback } from 'react';
import { useSelector } from 'react-redux'
import { AppState } from '../state';
import { ListGroupItem, ListGroupItemHeading, ListGroupItemText, ListGroup } from 'reactstrap';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import styled from 'styled-components';

const MyContainer = styled.div`
width: 100%;
height: 100%;
`;

export const DisplayPosts: React.FC = () => {
  const posts = useSelector((state: AppState) => state.posts.posts)

  const rowRender = useCallback(({ index, style }: ListChildComponentProps) => {
    console.log(`Render ${index}/${posts.length}`)
    const { title, body } = posts[index];
    return (
      <ListGroupItem style={style} >
        <ListGroupItemHeading>{title}</ListGroupItemHeading>
        <ListGroupItemText>{body}</ListGroupItemText>
      </ListGroupItem>
    )
  }, [posts]);

  return (
    <MyContainer>
      <AutoSizer>
        {({ height, width }) => {
          return (
            <ListGroup>
              <FixedSizeList
                itemCount={posts.length}
                itemSize={150}
                height={height}
                width={width}
              >
                {rowRender}
              </FixedSizeList>
            </ListGroup>
          )
        }}
      </AutoSizer>
    </MyContainer>
  )
}
