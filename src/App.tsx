import React from 'react';
import { Main } from './composants';
import styled from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { StoresProvider } from './stores';

const MyContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;
`;

const App: React.FC = () => (
  <>
    <StoresProvider>
      <BrowserRouter>
        <MyContainer>
          <Main />
        </MyContainer>
      </BrowserRouter>
    </StoresProvider>
  </>
);

export default App;
