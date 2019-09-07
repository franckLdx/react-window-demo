import { combineReducers } from "redux";
import { posts } from "./posts/reducers";
import { comments } from "./comments/reducers";
import { postsState } from "./postsState/reducers";

export const rootReducer = combineReducers({ posts, comments, postsState });
