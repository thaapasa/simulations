import React from 'react';
import styled from 'styled-components';
import { Position } from '../game/common/Position';
import { Ant } from '../game/langton/Ant';
import { InfiniteGrid } from '../game/langton/InfiniteGrid';
import { timeout } from '../util/Util';
import { FastForwardIcon, IconBar, PlayIcon, SkipIcon } from './Icons';
import SimulationView from './SimulationView';

interface GameState {
  grid: boolean[][];
  antPosition: Position;
  antRotation: number;
}

export default class LangtonsAnt extends React.Component<{}, GameState> {
  state: GameState = {
    grid: [],
    antPosition: { x: 0, y: 0 },
    antRotation: 0,
  };
  private grid = new InfiniteGrid(false);
  private ant = new Ant();
  private stepping = false;

  private range = { from: { x: -14, y: -7 }, to: { x: 15, y: 7 } };

  componentDidMount() {
    this.updateGrid();
  }

  render() {
    return (
      <Container>
        <SimulationView {...this.state} gridOffset={this.range.from} />
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
    const grid = this.grid.render(this.range.from, this.range.to);
    this.setState({
      antPosition: { ...this.ant.position },
      antRotation: this.ant.rotation,
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
