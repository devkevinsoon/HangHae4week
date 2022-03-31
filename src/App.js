
import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled, { ThemeProvider } from "styled-components";
import { useDispatch } from 'react-redux';

// component import 
import Home from "./Home";
import FormPage from "./FormPage";
import Header from "./Header";

// style import
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";

// redux import
import { loadWordsFB } from "./redux/module/words"; 

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadWordsFB());
  },[dispatch]);
  
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <GlobalStyles />
        <Header />
        <Container>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/word"  component={FormPage}/>
            <Route path="/word/:id/edit"  component={FormPage}/>
          </Switch>
        </Container>
      </div>
    </ThemeProvider>
  );
}

const Container = styled.div`
  margin-top: 40px;
  padding: 0 30px;
  // theme.js에서 지정한 문자열을 이용 - @media screen and (min-width: 768px) {} 와 같은 뜻이 된다.
  // 짧게 쓰고 유지보수성을 높이기 위해 theme로 등록 - theme.js
  ${({ theme }) => theme.device.tablet} {
    margin-top: 60px;
    padding: 0 50px;
  }
  ${({ theme }) => theme.device.desktop} {
    max-width: 1400px;
    margin: 60px auto 0 auto;
  }
`;

export default App;
