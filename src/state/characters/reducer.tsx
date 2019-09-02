import { CharacterState, initialCharacterState } from "./state";
import { AppActions } from "../action";

export const characters = (state: CharacterState = initialCharacterState, action: AppActions): CharacterState => {
  switch (action.type) {
    case 'LOADING_CHARACTERS':
      return { ...state, loadStatus: 'loading' }
    case 'LOADING_CHARACTER_SUCCESSFULL':
      return {
        ...state,
        loadStatus: 'loaded',
        characters: [...state.characters, ...action.characters],
        totalCount: action.totalCount,
        nextPageToLoad: state.nextPageToLoad + 1
      }
    case 'LOADING_CHARACTERS_ERROR':
      return { ...state, loadStatus: 'error' }
    default:
      return state;
  }
}