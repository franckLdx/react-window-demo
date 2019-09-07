import { initialComments, Comments } from "./state";
import { AppActions } from "../actions";

export const comments = (state: Comments = initialComments, action: AppActions): Comments => {
  switch (action.type) {
    case 'LOADING_COMMENTS_SUCCESSFULL':
      return [...state, ...action.comments];
    default:
      return state;
  }
}