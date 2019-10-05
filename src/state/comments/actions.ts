import { ActionCreator } from "redux";
import { PostComment } from "../../types";
import { AppState } from "../state";
import { AppThunkDispatch, loadPosts } from "../actions";
import { ThunkExtraArgs } from "../thunks";
import { makeGetCommentsOfPostLoadStatus } from "../postsState/selectors";

export const loadCommentsOfPost = (postId: number, force = false) => {
  const getCommentsOfPostLoadStatus = makeGetCommentsOfPostLoadStatus(postId)
  return async (dispatch: AppThunkDispatch, getState: () => AppState, { services }: ThunkExtraArgs) => {
    dispatch(loadPosts());
    if (getCommentsOfPostLoadStatus(getState()) === 'loaded' && !force) {
      return;
    }
    dispatch(loadingComments(postId));
    services.loadCommentsOfPost(postId)
      .then(
        response => dispatch(loadingCommentsSuccessfull(postId, response))
      ).catch(
        () => dispatch(loadingCommentsError(postId))
      );
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

export interface LoadingCommentsError {
  type: 'LOADING_COMMENTS_ERROR',
  postId: number,
}
export const loadingCommentsError: ActionCreator<LoadingCommentsError> = (postId: number) => ({
  type: 'LOADING_COMMENTS_ERROR',
  postId,
});

export interface LoadingComments {
  type: 'LOADING_COMMENTS',
  postId: number,
}
export const loadingComments: ActionCreator<LoadingComments> = (postId: number) => ({
  type: 'LOADING_COMMENTS',
  postId,
});


export type CommentsActions = LoadingComments | LoadingCommentsSuccessfull | LoadingCommentsError;
