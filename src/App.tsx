import React from 'react';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { PostsList } from './PostsList';

const App: React.FC = () => <>
  <Provider store={store}>
    <PostsList />
  </Provider></>;

export default App;
