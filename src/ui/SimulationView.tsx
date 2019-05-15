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
    {allNumbers(model.range.from.y, model.range.to.y).map(y => (
      <GridTile
        key={`${x},${y}`}
        pos={{ x, y }}
        gridOffset={model.gridOffset}
        offset={model.offset}
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
    return (
      <Container>
        {this.renderGrid(model.frame)}
        <AntTile
          pos={model.antPosition}
          gridOffset={model.gridOffset}
          offset={model.offset}
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

  private updateSize = () => {
    if (this.props.size.height > 0 && this.props.size.width > 0) {
      this.props.model.drawAreaSize = this.props.size;
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
  background-color: ${Colors.darkBlue};
  background-image: url(${grid});
  background-position: 15px 15px;
  overflow: hidden;
`;

export default StyledSimulationView;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
