import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import { Size } from '../game/common/Size';
import grid from '../icons/grid.svg';
import { allNumbers } from '../util/Util';
import { Colors } from './Colors';
import { LangtonModel } from './langton/LangtonGame';
import { AntTile, GridTile } from './langton/Tiles';
import { SizeAware } from './SizeAware';

const GridRow = ({ model, x }: { model: LangtonModel; x: number }) => (
  <>
    {allNumbers(model.tileRange.from.y, model.tileRange.to.y).map(y => (
      <GridTile
        key={`${x},${y}`}
        pos={{ x, y }}
        offset={model.tileRange.from}
        white={model.grid.get(x, y)}
      />
    ))}
  </>
);

@observer
class SimulationView extends React.Component<{
  size: Size;
  model: LangtonModel;
}> {
  componentDidMount() {
    this.updateSize();
  }
  componentDidUpdate() {
    this.updateSize();
  }

  render() {
    const { model } = this.props;
    const gridOffset = model.gridOffset;
    return (
      <Container style={{ left: gridOffset.x, bottom: gridOffset.y }}>
        {this.renderGrid(model.frame)}
        <AntTile
          pos={model.antPosition}
          offset={model.tileRange.from}
          rotation={model.antRotation}
          animated={model.animate}
        />
      </Container>
    );
  }

  renderGrid = (_: number) => {
    const { model } = this.props;
    return allNumbers(model.tileRange.from.x, model.tileRange.to.x).map(x => (
      <GridRow key={x} x={x} model={model} />
    ));
  };

  private updateSize = () => {
    if (this.props.size.height > 0 && this.props.size.width > 0) {
      this.props.model.renderSize = this.props.size;
    }
  };
}

const SizedSimulationView = SizeAware(SimulationView);
const StyledSimulationView = styled(SizedSimulationView)`
  width: 100%;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 2px solid ${Colors.black};
  border-radius: 8px;
`;

export default StyledSimulationView;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${Colors.darkBlue};
  background-image: url(${grid});
  background-position: 15px 15px;
`;
