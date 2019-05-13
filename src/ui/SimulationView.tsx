import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import grid from '../icons/grid.svg';
import { allNumbers } from '../util/Util';
import { Colors } from './Colors';
import { LangtonModel } from './langton/LangtonGame';
import { AntTile, GridTile, tileSize } from './langton/Tiles';

const tiles = {
  width: 30,
  height: 15,
};

const GridRow = ({ model, x }: { model: LangtonModel; x: number }) => (
  <>
    {allNumbers(model.range.from.y, model.range.to.y).map(y => (
      <GridTile
        key={`${x},${y}`}
        pos={{ x, y }}
        offset={model.gridOffset}
        white={model.grid.get(x, y)}
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
        {this.renderGrid(model.frame)}
        <AntTile
          pos={model.antPosition}
          offset={model.gridOffset}
          rotation={model.antRotation}
          animated={model.animate}
        />
      </Container>
    );
  }

  renderGrid = (_: number) => {
    const { model } = this.props;
    return allNumbers(model.range.from.x, model.range.to.x).map(x => (
      <GridRow key={x} x={x} model={model} />
    ));
  };
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
