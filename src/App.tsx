import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import JuliaUI from './ui/fractal/JuliaUI';
import MandelbrotUI from './ui/fractal/MandelbrotUI';
import LangtonsAntUI from './ui/langton/LangtonsAntUI';
import GameOfLifeUI from './ui/life/GameOfLifeUI';

const App: React.FC = () => (
  <Container className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/p/langtons-ant" element={<LangtonsAntUI />} />
        <Route path="/p/game-of-life" element={<GameOfLifeUI />} />
        <Route path="/p/mandelbrot" element={<MandelbrotUI />} />
        <Route path="/p/julia/:r/:i" element={<JuliaUI />} />
        <Route path="*" element={<LangtonsAntUI />} />
      </Routes>
    </BrowserRouter>
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
