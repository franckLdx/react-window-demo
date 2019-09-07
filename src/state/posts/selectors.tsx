import { AppState } from "../state";

export const getPosts = (state: AppState) => state.posts;

export const getPost = (state: AppState, id: number) => getPosts(state).find(post => post.id === id)
