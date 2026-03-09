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
          <input
            type="range"
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

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.model.speed.value = Number(e.target.value);
  };
}

const Label = styled.div``;

const SliderArea = styled.div`
  margin-left: 16px;
  width: 150px;
`;
