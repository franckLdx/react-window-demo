import { LoadStatus } from "../utils";

export interface PostState {
  id: number;
  commentStatus: LoadStatus;
}

export interface PostsState {
  listStatus: LoadStatus;
  postState: PostState[];
}

export const initialPostState: PostsState = {
  listStatus: 'initial',
  postState: [],
}