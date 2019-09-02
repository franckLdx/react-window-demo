import { CharactersActions } from "./characters/actions";
import { loadCharacters, LoadCharacters } from '../service';

export type AppActions = CharactersActions;

export interface ThunkExtraArgs {
  loadCharacters: LoadCharacters
}

export const thunkExtraArg: ThunkExtraArgs = {
  loadCharacters
};
