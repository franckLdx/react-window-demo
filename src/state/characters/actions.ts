import { ActionCreator } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../state";
import { AppActions, ThunkExtraArgs } from "../action";
import { Character } from "../../types";

type AppThunkDispatch = ThunkDispatch<AppState, ThunkExtraArgs, AppActions>;

export const loadCharacters = () => {
  return async (dispatch: AppThunkDispatch, getState: () => AppState, { loadCharacters }: ThunkExtraArgs) => {
    const { characters: charactersState } = getState();
    if (charactersState.loadStatus === 'initial') {
      dispatch(LoadingCharacters());
    }
    try {
      const { characters, totalCount } = await loadCharacters(charactersState.nextPageToLoad);
      dispatch(loadingCharacterSuccessfull(characters, totalCount));
    } catch (error) {
      console.error(error);
      dispatch(loadingCharactersError());
    }
  }
}

export interface LoadingCharacters {
  type: 'LOADING_CHARACTERS'
}
export const LoadingCharacters = (): LoadingCharacters => ({
  type: 'LOADING_CHARACTERS'
});

export interface LoadingCharactersSuccess {
  type: 'LOADING_CHARACTER_SUCCESSFULL',
  characters: Character[],
  totalCount: number
}
export const loadingCharacterSuccessfull = (characters: Character[], totalCount: number): LoadingCharactersSuccess => ({
  type: 'LOADING_CHARACTER_SUCCESSFULL',
  characters,
  totalCount: totalCount,
});

export interface LoadingCharactersError {
  type: 'LOADING_CHARACTERS_ERROR'
}
export const loadingCharactersError: ActionCreator<LoadingCharactersError> = () => ({
  type: 'LOADING_CHARACTERS_ERROR'
});

export type CharactersActions = LoadingCharactersSuccess | LoadingCharacters | LoadingCharactersError;

export type LoadStatus = 'initial' | 'loading' | 'loaded' | 'failed';
