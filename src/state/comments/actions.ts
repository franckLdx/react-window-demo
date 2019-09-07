import { ActionCreator } from "redux";
import { PostComment } from "../../types";

export interface LoadingCommentsSuccessfull {
  type: 'LOADING_COMMENTS_SUCCESSFULL',
  comments: PostComment[]
}
export const loadingCommentsSuccessfull: ActionCreator<LoadingCommentsSuccessfull> = (comments: PostComment[]) => ({
  type: 'LOADING_COMMENTS_SUCCESSFULL',
  comments,
});

export type CommentsActions = LoadingCommentsSuccessfull;
