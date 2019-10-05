import { AppState } from "../state";
import { createSelector } from "reselect";
import { PostComment } from "../../types";

export const getComments = (state: AppState) => state.comments;

export const makeGetCommentsOfPost = (postId: number) => createSelector(
  [getComments],
  (postComments: PostComment[]) => postComments.filter(comment => comment.postId === postId)
);