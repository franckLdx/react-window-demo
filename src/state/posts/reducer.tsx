import { PostState, initialPostState } from "./state";
import { AppActions } from "../action";

export const posts = (state: PostState = initialPostState, action: AppActions): PostState => {
  switch (action.type) {
    case 'LOADING_POSTS':
      return { ...state, loadStatus: 'loading' }
    case 'LOADING_POST_SUCCESSFULL':
      return { ...state, loadStatus: 'loaded', posts: action.posts }
    case 'LOADING_POSTS_ERROR':
      return { ...state, loadStatus: 'error' }
    default:
      return state;
  }
}