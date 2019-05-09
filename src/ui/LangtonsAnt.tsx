import React from 'react';
import styled from 'styled-components';
import { Direction } from '../game/common/Direction';
import { Position } from '../game/common/Position';
import { Ant } from '../game/langton/Ant';
import { InfiniteGrid } from '../game/langton/InfiniteGrid';
import { timeout } from '../util/Util';
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
  private stepping = false;

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

  animateStep = async () => {
    this.updateGrid();
    await timeout(180);
  };

  updateGrid = () => {
    const grid = this.grid.render({ x: -14, y: -8 }, { x: 15, y: 8 });
    this.setState({
      antPosition: { ...this.ant.position },
      antDirection: this.ant.direction,
      grid,
    });
  };

  step = async () => {
    if (this.stepping) {
      return;
    }
    this.stepping = true;
    await this.ant.stepAnimated(this.grid, this.animateStep);
    await this.animateStep();
    this.stepping = false;
  };
}

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
