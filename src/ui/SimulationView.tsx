import React from 'react';
import styled from 'styled-components';
import { Direction } from '../game/common/Direction';
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

function positionStyle(pos: Position, offset: Position) {
  const x = pos.x - offset.x;
  const y = pos.y - offset.y;
  return { left: `${x * tileSize - 1}px`, top: `${y * tileSize - 1}px` };
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

const Ant = ({
  pos,
  offset,
  direction,
}: {
  pos: Position;
  offset: Position;
  direction: Direction;
}) => (
  <TileImage
    style={positionStyle(pos, offset)}
    className={`ant direction-${direction}`}
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

class SimulationView extends React.Component<{
  antDirection: Direction;
  antPosition: Position;
  gridOffset: Position;
  grid: boolean[][];
}> {
  render() {
    return (
      <Container>
        {this.props.grid.map((col, x) => (
          <GridRow key={x} col={col} offset={this.props.gridOffset} x={x} />
        ))}
        <Ant
          pos={this.props.antPosition}
          offset={this.props.gridOffset}
          direction={this.props.antDirection}
        />
      </Container>
    );
  }
}

export default SimulationView;

const Container = styled.div`
  position: relative;
  margin: 32 px;
  padding: 0;
  border: 2 px solid ${Colors.black};
  border-radius: 8 px;
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
