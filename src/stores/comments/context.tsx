import React, { createContext, useContext } from 'react';
import { Store, createStore } from './store';
import { useLocalStore } from 'mobx-react-lite';

const CommentsStoreContext = createContext<Store | null>(null);

export const useCommentsStore = () => {
  const store = useContext(CommentsStoreContext);
  if (store === null) {
    throw new Error("Comments store must be created before usage");
  }
  return store;
}

export const CommentsStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = useLocalStore<Store>(createStore);
  return <CommentsStoreContext.Provider value={store}>{children}</CommentsStoreContext.Provider>
}