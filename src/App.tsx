import React from 'react';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { CharactersList } from './CharactersList';

const App: React.FC = () => <>
  <Provider store={store}>
    <CharactersList />
  </Provider></>;

export default App;
