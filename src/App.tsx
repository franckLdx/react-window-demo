import React from 'react';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { Main } from './composants';
import styled from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { apiContext } from './services/context';
import { services } from './services';

const MyContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;
`;

const App: React.FC = () => (
  <>
    <Provider store={store}>
      <apiContext.Provider value={services} >
        <BrowserRouter>
          <MyContainer>
            <Main />
          </MyContainer>
        </BrowserRouter>
      </apiContext.Provider>
    </Provider>
  </>
);

export default App;
