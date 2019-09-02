import React from 'react';
import { ListGroup } from 'reactstrap';
import AutoSizer from "react-virtualized-auto-sizer";
import styled from 'styled-components';
import { RenderList } from './RenderList';
import { ListLoader } from './ListLoaderProps';

const MyContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const DisplayCharacters: React.FC = () => {
  return (
    <MyContainer>
      <AutoSizer>
        {({ height, width }) =>
          <ListGroup>
            <ListLoader>
              {({ onItemsRendered, ref }) => (
                <RenderList
                  onItemsRendered={onItemsRendered}
                  ref={ref}
                  height={height}
                  width={width}
                />
              )}
            </ListLoader>
          </ListGroup>
        }
      </AutoSizer>
    </MyContainer>
  )
}
