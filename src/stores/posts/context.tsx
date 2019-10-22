import React, { createContext, useContext } from 'react';
import { useLocalStore } from 'mobx-react-lite';
import { createStore, Store } from './store';

const PostsStoreContext = createContext<Store | null>(null);

export const usePostsStore = () => {
  const store = useContext(PostsStoreContext);
  if (store === null) {
    throw new Error("Posts store must be created before usage");
  }
  return store;
}

export const PostsStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = useLocalStore<Store>(createStore);
  return <PostsStoreContext.Provider value={store}>{children}</PostsStoreContext.Provider>
}