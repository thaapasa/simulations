import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import { Direction } from '../game/common/Direction';
import { Position } from '../game/common/Position';
import { Ant } from '../game/langton/Ant';
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

function positionStyle(pos: Position, offset: Position, rotation?: number) {
  const x = pos.x - offset.x;
  const y = pos.y - offset.y;
  return {
    left: `${x * tileSize - 1}px`,
    bottom: `${y * tileSize - 1}px`,
    transform: rotation ? `rotate(${rotation}deg` : undefined,
  };
}

const Tile = ({
  pos,
  offset,
  white,
}: {
  pos: Position;
  offset: Position;
  white: boolean;
}) => (
  <TileImage
    style={positionStyle(pos, offset)}
    src={white ? whiteTile : blackTile}
  />
);

const AntTile = ({
  pos,
  offset,
  rotation,
}: {
  pos: Position;
  offset: Position;
  rotation: number;
}) => (
  <TileImage
    style={positionStyle(pos, offset, rotation)}
    className={'ant'}
    src={ant}
  />
);

const GridRow = ({
  col,
  offset,
  x,
}: {
  col: boolean[];
  offset: Position;
  x: number;
}) => (
  <>
    {col.map((white, y) => (
      <Tile
        key={`${x},${y}`}
        pos={{ x: x + offset.x, y: y + offset.y }}
        offset={offset}
        white={white}
      />
    ))}
  </>
);

@observer
class SimulationView extends React.Component<{
  ant: Ant;
  gridOffset: Position;
  grid: boolean[][];
}> {
  render() {
    return (
      <Container>
        {this.props.grid.map((col, x) => (
          <GridRow key={x} col={col} offset={this.props.gridOffset} x={x} />
        ))}
        <AntTile
          pos={this.props.ant.position}
          offset={this.props.gridOffset}
          rotation={this.props.ant.rotation}
        />
      </Container>
    );
  }
}

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
  overflow: hidden;
`;

const TileImage = styled.img`
  position: absolute;
  &.ant {
    z-index: 1;
  }
  &.direction-${Direction.NORTH} {
    transform: rotate(0deg);
  }
  &.direction-${Direction.EAST} {
    transform: rotate(90deg);
  }
  &.direction-${Direction.SOUTH} {
    transform: rotate(180deg);
  }
  &.direction-${Direction.WEST} {
    transform: rotate(270deg);
  }
  transition: 0.25s ease-in-out;
`;
