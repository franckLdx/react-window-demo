import { AppActions, LoadingPostsSuccess } from "../actions";
import { PostsState, initialPostState, PostState } from "./state";
import { LoadingCommentsSuccessfull } from "../comments/actions";

export const postsState = (state: PostsState = initialPostState, action: AppActions): PostsState => {
  switch (action.type) {
    case 'LOADING_POSTS':
      return { ...state, listStatus: 'loading' };
    case 'LOADING_POST_SUCCESSFULL':
      return postsLoaded(state, action);
    case 'LOADING_POSTS_ERROR':
      return { ...state, listStatus: 'error' };
    case 'LOADING_COMMENTS_SUCCESSFULL':
      return commentsLoaded(state, action);
    default:
      return state;
  }
}

function postsLoaded(state: PostsState, action: LoadingPostsSuccess): PostsState {
  const postState = action.posts.map(
    ({ id }): PostState => ({ postId: id, commentStatus: 'initial' })
  );
  return {
    ...state,
    listStatus: 'loaded',
    postState,
  };
}


function commentsLoaded(state: PostsState, action: LoadingCommentsSuccessfull): PostsState {
  const postState = state.postState.filter(post => post.postId !== action.postId);
  postState.push({ postId: action.postId, commentStatus: 'loaded' })
  return {
    ...state,
    postState,
  };
}