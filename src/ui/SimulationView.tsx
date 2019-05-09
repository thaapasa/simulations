import React from 'react';
import styled from 'styled-components';
import { Position } from '../game/common/Position';
import ant from '../icons/ant.svg';
import blackTile from '../icons/black-tile.svg';
import grid from '../icons/grid.svg';
import whiteTile from '../icons/white-tile.svg';
import { Colors } from './Colors';

const tiles = {
  width: 30,
  height: 15,
};

const tileSize = 32;

function positionStyle(x: number, y: number) {
  return { left: `${x * tileSize - 1}px`, top: `${y * tileSize - 1}px` };
}

const Tile = ({ x, y, white }: Position & { white: boolean }) => (
  <TileImage style={positionStyle(x, y)} src={white ? whiteTile : blackTile} />
);

const Ant = ({ x, y }: Position) => (
  <TileImage style={positionStyle(x, y)} className="ant" src={ant} />
);

const SimulationView: React.FC = () => (
  <Container>
    <Tile x={2} y={3} white={true} />
    <Tile x={3} y={4} white={false} />
    <Ant x={2} y={3} />
  </Container>
);

export default SimulationView;

const Container = styled.div`
  position: relative;
  margin: 32px;
  padding: 0;
  border: 2px solid ${Colors.black};
  border-radius: 8px;
  background-color: ${Colors.darkBlue};
  background-image: url(${grid});
  background-position: 15px 15px;
  height: ${tiles.height * tileSize}px;
  width: ${tiles.width * tileSize}px;
`;

const TileImage = styled.img`
  position: absolute;
  &.ant {
    z-index: 1;
  }
`;
