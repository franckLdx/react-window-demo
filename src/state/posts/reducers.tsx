import { Posts, initialPostState } from "./state";
import { AppActions } from "../actions";

export const posts = (state: Posts = initialPostState, action: AppActions): Posts => {
  switch (action.type) {
    case 'LOADING_POST_SUCCESSFULL':
      return action.posts;
    default:
      return state;
  }
}