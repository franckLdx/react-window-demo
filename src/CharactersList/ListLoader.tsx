import React, { useCallback, Ref, ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState, loadingCharacterSuccessfull } from '../state';
import InfiniteLoader from "react-window-infinite-loader";
import { loadCharacters } from '../service';

interface ListLoaderProps {
  children: (props: {
    onItemsRendered: any;
    ref: Ref<any>;
  }) => ReactNode;
}

export const ListLoader: React.FC<ListLoaderProps> = ({ children }) => {
  const dispatch = useDispatch();

  const { characters, totalCount, nextPageToLoad } = useSelector((state: AppState) => state.characters);

  const isItemLoaded = useCallback(
    (index: number) => index < characters.length,
    [characters]
  );

  const loadMoreItems = useCallback(async () => {
    const { characters, totalCount } = await loadCharacters(nextPageToLoad);
    dispatch(loadingCharacterSuccessfull(characters, totalCount));
  }, [dispatch, nextPageToLoad]);

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      loadMoreItems={loadMoreItems}
      itemCount={totalCount}
    >
      {children}
    </InfiniteLoader>
  );
};
