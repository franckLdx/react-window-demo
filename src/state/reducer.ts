import { combineReducers } from "redux";
import { characters } from "./characters/reducer";

export const rootReducer = combineReducers({ characters });
