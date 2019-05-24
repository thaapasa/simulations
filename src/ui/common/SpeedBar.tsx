import Slider from '@material-ui/lab/Slider';
import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import { BoundValue } from '../../util/BoundValue';
import { IconBar } from '../Icons';

@observer
export default class ZoomBar extends React.Component<{
  model: { speed: BoundValue };
}> {
  render() {
    const { model } = this.props;
    return (
      <IconBar>
        <Label>Nopeus</Label>
        <SliderArea>
          <Slider
            value={model.speed.value}
            onChange={this.onChange}
            min={model.speed.min}
            max={model.speed.max}
            step={model.speed.step}
          />
        </SliderArea>
      </IconBar>
    );
  }

  onChange = (_: React.ChangeEvent<{}>, value: number) => {
    this.props.model.speed.value = value;
  };
}

const Label = styled.div``;

const SliderArea = styled.div`
  margin-left: 16px;
  width: 150px;
`;
