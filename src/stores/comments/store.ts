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
      commentsState.loadStatus = 'loading';
      this.byPost.set(postId, commentsState);
      commentsState.comments = await services.loadCommentsOfPost(postId);
      commentsState.loadStatus = 'loaded';
      runInAction(() => this.byPost.set(postId, commentsState));
    },

    getCommentsState(postId: number) {
      return this.byPost.get(postId) || initialComments;
    }
  }
}

const initialStore: InitialStore = {
  byPost: new Map<number, CommentsState>()
}

interface InitialStore {
  byPost: Map<number, CommentsState>
}

const initialComments: CommentsState = {
  loadStatus: 'initial',
  comments: [],
}

interface CommentsState {
  loadStatus: LoadStatus;
  comments: PostComment[];
}

export type Store = ReturnType<typeof createStore>
