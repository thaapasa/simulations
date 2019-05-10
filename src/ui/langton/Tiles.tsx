import React from 'react';
import styled from 'styled-components';
import { Position } from '../../game/common/Position';
import ant from '../../icons/ant.svg';
import blackTile from '../../icons/black-tile.svg';
import whiteTile from '../../icons/white-tile.svg';

export const tileSize = 32;

function positionStyle(pos: Position, offset: Position, rotation?: number) {
  const x = pos.x - offset.x;
  const y = pos.y - offset.y;
  return {
    left: `${x * tileSize - 1}px`,
    bottom: `${y * tileSize - 1}px`,
    transform: rotation ? `rotate(${rotation}deg` : undefined,
  };
}

export const GridTile = (p: {
  pos: Position;
  offset: Position;
  white: boolean;
}) => (
  <TileImage
    style={positionStyle(p.pos, p.offset)}
    src={p.white ? whiteTile : blackTile}
  />
);

export const AntTile = (p: {
  pos: Position;
  offset: Position;
  rotation: number;
}) => (
  <TileImage
    style={positionStyle(p.pos, p.offset, p.rotation)}
    className={'ant'}
    src={ant}
  />
);

const TileImage = styled.img`
  position: absolute;
  &.ant {
    z-index: 1;
  }
  transition: 0.25s ease-in-out;
`;
