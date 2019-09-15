import { AppActions, LoadingPostsSuccess } from "../actions";
import { PostsState, initialPostState, PostState } from "./state";
import { LoadingCommentsSuccessfull, LoadingCommentsError, LoadingComments } from "../comments/actions";

export const postsState = (state: PostsState = initialPostState, action: AppActions): PostsState => {
  switch (action.type) {
    case 'LOADING_POSTS':
      return { ...state, listStatus: 'loading' };
    case 'LOADING_POST_SUCCESSFULL':
      return postLoaded(state, action);
    case 'LOADING_POSTS_ERROR':
      return { ...state, listStatus: 'error' };
    case 'LOADING_COMMENTS':
      return loadingComments(state, action);
    case 'LOADING_COMMENTS_SUCCESSFULL':
      return commentsLoaded(state, action);
    case 'LOADING_COMMENTS_ERROR':
      return commentsLoadError(state, action);
    default:
      return state;
  }
}

function postLoaded(state: PostsState, action: LoadingPostsSuccess): PostsState {
  const postState = action.posts.map(
    ({ id }): PostState => ({ id: id, commentStatus: 'initial' })
  );
  return {
    ...state,
    listStatus: 'loaded',
    postState,
  };
}

function loadingComments(state: PostsState, action: LoadingComments): PostsState {
  const postState: PostState[] = [
    { id: action.postId, commentStatus: 'loading' },
    ...removePostState(state.postState, action.postId)
  ];
  return {
    ...state,
    postState,
  };
}

function commentsLoaded(state: PostsState, action: LoadingCommentsSuccessfull): PostsState {
  const postState: PostState[] = [
    { id: action.postId, commentStatus: 'loaded' },
    ...removePostState(state.postState, action.postId)
  ];
  return {
    ...state,
    postState,
  };
}

function commentsLoadError(state: PostsState, action: LoadingCommentsError): PostsState {
  const postState: PostState[] = [
    { id: action.postId, commentStatus: 'error' },
    ...removePostState(state.postState, action.postId)
  ];
  return {
    ...state,
    postState,
  };
}

const removePostState = (postsState: PostState[], postId: number) =>
  postsState.filter(postState => postState.id !== postId)