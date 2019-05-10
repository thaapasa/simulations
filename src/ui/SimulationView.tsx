import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import { Position } from '../game/common/Position';
import grid from '../icons/grid.svg';
import { Colors } from './Colors';
import { LangtonModel } from './langton/LangtonGame';
import { AntTile, GridTile, tileSize } from './langton/Tiles';

const tiles = {
  width: 30,
  height: 15,
};

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
      <GridTile
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
  model: LangtonModel;
}> {
  render() {
    const { model } = this.props;
    return (
      <Container>
        {model.visibleGrid.map((col, x) => (
          <GridRow key={x} col={col} offset={model.gridOffset} x={x} />
        ))}
        <AntTile
          pos={model.antPosition}
          offset={model.gridOffset}
          rotation={model.antRotation}
          animated={model.animate}
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
