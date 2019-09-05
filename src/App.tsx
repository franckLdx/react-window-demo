import React from 'react';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { Main } from './composants';

const App: React.FC = () => <>
  <Provider store={store}>
    <Main />
  </Provider></>;

export default App;
