import Slider from '@material-ui/lab/Slider';
import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import { BoundValue } from '../../util/BoundValue';
import { IconBar } from '../Icons';

@observer
export default class ZoomBar extends React.Component<{
  model: { scale: BoundValue; render: () => void };
}> {
  render() {
    const { model } = this.props;
    return (
      <IconBar className="web">
        <Label>Zoom</Label>
        <SliderArea>
          <Slider
            value={model.scale.value}
            onChange={this.onChange}
            min={model.scale.min}
            max={model.scale.max}
            step={0.05}
          />
        </SliderArea>
      </IconBar>
    );
  }

  onChange = (_: React.ChangeEvent<{}>, value: number) => {
    this.props.model.scale.value = value;
    this.props.model.render();
  };
}

const Label = styled.div``;

const SliderArea = styled.div`
  margin-left: 16px;
  width: 150px;
`;
