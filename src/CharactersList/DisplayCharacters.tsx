import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { AppState, loadingCharacterSuccessfull } from '../state';
import { ListGroupItem, ListGroupItemHeading, ListGroupItemText, ListGroup } from 'reactstrap';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";
import styled from 'styled-components';
import { loadCharacters } from '../service';

const MyContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const DisplayCharacters: React.FC = () => {
  const { characters, totalCount, nextPageToLoad } = useSelector((state: AppState) => state.characters)

  const rowRender = useCallback(({ index, style }: ListChildComponentProps) => {
    console.log(`Render ${index}/${characters.length}`)
    const { name, birthYear } = characters[index];
    return (
      <ListGroupItem style={style} >
        <ListGroupItemHeading>{name}</ListGroupItemHeading>
        <ListGroupItemText>birth year: {birthYear}</ListGroupItemText>
      </ListGroupItem>
    )
  }, [characters]);

  const isItemLoaded = useCallback((index: number) => index < characters.length, [characters]);

  const dispatch = useDispatch();

  const loadMoreItems = useCallback(
    async () => {
      const { characters, totalCount } = await loadCharacters(nextPageToLoad);
      dispatch(loadingCharacterSuccessfull(characters, totalCount));
    },
    [dispatch, nextPageToLoad]
  );

  return (
    <MyContainer>
      <AutoSizer>
        {({ height, width }) => {
          return (
            <ListGroup>
              <InfiniteLoader
                isItemLoaded={isItemLoaded}
                loadMoreItems={loadMoreItems}
                itemCount={totalCount}
              >
                {({ onItemsRendered, ref }) => (
                  <FixedSizeList
                    onItemsRendered={onItemsRendered}
                    ref={ref}
                    itemCount={characters.length}
                    itemSize={150}
                    height={height}
                    width={width}
                  >
                    {rowRender}
                  </FixedSizeList>
                )}
              </InfiniteLoader>
            </ListGroup>
          )
        }}
      </AutoSizer>
    </MyContainer>
  )
}
