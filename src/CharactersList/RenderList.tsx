import React, { useCallback, Ref } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../state';
import { ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

interface RenderListProps {
  onItemsRendered: any,
  ref: Ref<any>,
  height: number,
  width: number,
}

export const RenderList: React.FC<RenderListProps> = ({ onItemsRendered, ref, height, width }) => {
  const { characters } = useSelector((state: AppState) => state.characters);

  const rowRender = useCallback(({ index, style }: ListChildComponentProps) => {
    const { name, birthYear } = characters[index];
    return (
      <ListGroupItem style={style}>
        <ListGroupItemHeading>{name}</ListGroupItemHeading>
        <ListGroupItemText>birth year: {birthYear}</ListGroupItemText>
      </ListGroupItem>
    );
  }, [characters]);

  return (
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
  );
};
