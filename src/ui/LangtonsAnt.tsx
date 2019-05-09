import React from 'react';
import styled from 'styled-components';
import { Direction } from '../game/common/Direction';
import { Position } from '../game/common/Position';
import { Ant } from '../game/langton/Ant';
import { InfiniteGrid } from '../game/langton/InfiniteGrid';
import { FastForwardIcon, IconBar, PlayIcon, SkipIcon } from './Icons';
import SimulationView from './SimulationView';

interface GameState {
  grid: boolean[][];
  antPosition: Position;
  antDirection: Direction;
}

export default class LangtonsAnt extends React.Component<{}, GameState> {
  state: GameState = {
    grid: [],
    antPosition: { x: 0, y: 0 },
    antDirection: Direction.NORTH,
  };
  private grid = new InfiniteGrid(false);
  private ant = new Ant();

  componentDidMount() {
    this.updateGrid();
  }

  render() {
    return (
      <Container>
        <SimulationView {...this.state} gridOffset={{ x: -14, y: -8 }} />
        <IconBar>
          <PlayIcon />
          <SkipIcon onClick={this.step} />
          <FastForwardIcon />
        </IconBar>
      </Container>
    );
  }

  updateGrid = () => {
    const grid = this.grid.render({ x: -14, y: -8 }, { x: 15, y: 8 });
    this.setState({
      antPosition: { ...this.ant.position },
      antDirection: this.ant.direction,
      grid,
    });
  };

  step = () => {
    this.ant.step(this.grid);
    this.updateGrid();
  };
}

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
