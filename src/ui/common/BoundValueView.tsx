import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import { BoundValue } from '../../util/BoundValue';
import { IconBar } from '../Icons';

@observer
export default class BoundValueView extends React.Component<{
  value: BoundValue;
  title: string;
  className?: string;
  onChange?: () => void;
}> {
  render() {
    const value = this.props.value;
    return (
      <IconBar className={this.props.className}>
        <Label>{this.props.title}</Label>
        <SliderArea>
          <input
            type="range"
            value={value.value}
            onChange={this.onChange}
            min={value.min}
            max={value.max}
            step={value.step}
          />
        </SliderArea>
      </IconBar>
    );
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.value.value = Number(e.target.value);
    if (this.props.onChange) {
      this.props.onChange();
    }
  };
}

const Label = styled.div``;

const SliderArea = styled.div`
  margin-left: 16px;
  width: 150px;
`;
