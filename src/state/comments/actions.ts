import { ActionCreator } from "redux";
import { PostComment } from "../../types";
import { AppState } from "../state";
import { AppThunkDispatch, loadPosts } from "../actions";
import { ThunkExtraArgs } from "../thunks";
import { getCommentsLoadStatus } from "../postsState/selectors";

export const loadCommentsOfPost = (postId: number) => {
  return async (dispatch: AppThunkDispatch, getState: () => AppState, { loadCommentsOfPost }: ThunkExtraArgs) => {
    dispatch(loadPosts());
    if (getCommentsLoadStatus(getState(), postId) === 'loaded') {
      return;
    }
    const response = await loadCommentsOfPost(postId);
    dispatch(loadingCommentsSuccessfull(postId, response));
  }
}

export interface LoadingCommentsSuccessfull {
  type: 'LOADING_COMMENTS_SUCCESSFULL',
  postId: number,
  comments: PostComment[]
}
export const loadingCommentsSuccessfull: ActionCreator<LoadingCommentsSuccessfull> = (postId: number, comments: PostComment[]) => ({
  type: 'LOADING_COMMENTS_SUCCESSFULL',
  postId,
  comments,
});

export type CommentsActions = LoadingCommentsSuccessfull;
