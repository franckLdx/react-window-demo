import { PostsActions } from "./posts/actions";
import { CommentsActions } from "./comments/actions";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "./state";
import { ThunkExtraArgs } from "./thunks";

export * from "./posts/actions";
export * from "./comments/actions";

export type AppActions = PostsActions | CommentsActions;

export type AppThunkDispatch = ThunkDispatch<AppState, ThunkExtraArgs, AppActions>;
