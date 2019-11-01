import { configure, runInAction } from "mobx";
import { LoadStatus, canLoad } from "../utils";
import { PostComment } from "../../types";
import { services } from "../../services";

configure({ enforceActions: "observed" })

export function createStore() {
  return {
    ...initialStore,

    async loadComments(postId: number) {
      const commentsState = this.getCommentsState(postId);
      if (!canLoad(commentsState.loadStatus)) {
        return;
      }
      this.byPost.set(postId, { ...commentsState, loadStatus: 'loading' });
      const comments = await services.loadCommentsOfPost(postId);
      runInAction(() => this.byPost.set(postId, { ...commentsState, comments, loadStatus: 'loaded' }));
    },

    getCommentsState(postId: number) {
      return this.byPost.get(postId) || Object.assign({}, initialComments);
    }
  }
}

const initialStore: InitialStore = {
  byPost: new Map<number, CommentsState>()
}

interface InitialStore {
  byPost: Map<number, CommentsState>
}

const initialComments: Readonly<CommentsState> = {
  loadStatus: 'initial',
  comments: [],
}

interface CommentsState {
  loadStatus: LoadStatus;
  comments: PostComment[];
}

export type Store = ReturnType<typeof createStore>
