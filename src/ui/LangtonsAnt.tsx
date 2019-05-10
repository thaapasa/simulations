import { observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import { Ant } from '../game/langton/Ant';
import { InfiniteGrid } from '../game/langton/InfiniteGrid';
import { timeout } from '../util/Util';
import { FastForwardIcon, IconBar, PlayIcon, SkipIcon } from './Icons';
import SimulationView from './SimulationView';

@observer
export default class LangtonsAnt extends React.Component<{}> {
  private grid = new InfiniteGrid(false);

  @observable
  private renderedGrid: boolean[][] = [];
  @observable
  private ant = new Ant();
  private stepping = false;

  private range = { from: { x: -14, y: -7 }, to: { x: 15, y: 7 } };

  componentDidMount() {
    this.updateGrid();
  }

  render() {
    return (
      <Container>
        <SimulationView
          gridOffset={this.range.from}
          grid={this.renderedGrid}
          ant={this.ant}
        />
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
    this.renderedGrid = this.grid.render(this.range.from, this.range.to);
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
