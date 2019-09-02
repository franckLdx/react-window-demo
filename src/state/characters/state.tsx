import { Character } from "../../types";

export type LoadStatus = 'initial' | 'loading' | 'loaded' | 'error';

export interface CharacterState {
  loadStatus: LoadStatus,
  totalCount: number,
  nextPageToLoad: number
  characters: Character[],
}

export const initialCharacterState: CharacterState = {
  loadStatus: 'initial',
  totalCount: 0,
  nextPageToLoad: 1,
  characters: []
}
