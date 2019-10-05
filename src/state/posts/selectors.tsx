import { AppState } from "../state";
import { createSelector } from "reselect";
import { Post } from "../../types";

export const getPosts = (state: AppState) => state.posts;

export const makeGetPost = (id: number) => createSelector(
  [getPosts],
  (posts: Post[]) => posts.find(post => post.id === id)
);
