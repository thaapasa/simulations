import { createBrowserHistory } from 'history';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import styled from 'styled-components';
import JuliaUI from './ui/fractal/JuliaUI';
import MandelbrotUI from './ui/fractal/MandelbrotUI';
import LangtonsAntUI from './ui/langton/LangtonsAntUI';
import GameOfLifeUI from './ui/life/GameOfLifeUI';

export const history = createBrowserHistory({});

const App: React.FC = () => (
  <Container className="App">
    <Router history={history}>
      <Switch>
        <Route path="/p/langtons-ant" component={LangtonsAntUI} />
        <Route path="/p/game-of-life" component={GameOfLifeUI} />
        <Route path="/p/mandelbrot" component={MandelbrotUI} />
        <Route path="/p/julia/:r/:i" component={JuliaUI} />
        <Route component={LangtonsAntUI} />
      </Switch>
    </Router>
  </Container>
);

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export default App;
