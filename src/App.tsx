import React from 'react';
import { Main } from './composants';
import styled from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { StoresProvider } from './stores';
import { ApiProvider } from './services';

const MyContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;
`;

const App: React.FC = () => (
  <>
    <ApiProvider>
      <StoresProvider>
        <BrowserRouter>
          <MyContainer>
            <Main />
          </MyContainer>
        </BrowserRouter>
      </StoresProvider>
    </ApiProvider>
  </>
);

export default App;
