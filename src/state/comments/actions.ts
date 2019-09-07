import { ActionCreator } from "redux";
import { PostComment } from "../../types";
import { AppState } from "../state";
import { AppThunkDispatch, loadPosts } from "../actions";
import { ThunkExtraArgs } from "../thunks";
import { getCommentsOfPost } from "./selectors";

export const loadCommentsOfPost = (postId: number) => {
  return async (dispatch: AppThunkDispatch, getState: () => AppState, { loadCommentsOfPost }: ThunkExtraArgs) => {
    dispatch(loadPosts());
    if (getCommentsOfPost(getState(), postId).length !== 0) {
      return;
    }
    const response = await loadCommentsOfPost(postId);
    dispatch(loadingCommentsSuccessfull(response));
  }
}

export interface LoadingCommentsSuccessfull {
  type: 'LOADING_COMMENTS_SUCCESSFULL',
  comments: PostComment[]
}
export const loadingCommentsSuccessfull: ActionCreator<LoadingCommentsSuccessfull> = (comments: PostComment[]) => ({
  type: 'LOADING_COMMENTS_SUCCESSFULL',
  comments,
});

export type CommentsActions = LoadingCommentsSuccessfull;
