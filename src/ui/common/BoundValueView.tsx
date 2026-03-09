import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import { BoundValue } from '../../util/BoundValue';
import { IconBar } from '../Icons';

const BoundValueView = observer(
  ({
    value,
    title,
    className,
    onChange,
  }: {
    value: BoundValue;
    title: string;
    className?: string;
    onChange?: () => void;
  }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      value.value = Number(e.target.value);
      onChange?.();
    };

    return (
      <IconBar className={className}>
        <Label>{title}</Label>
        <SliderArea>
          <input
            type="range"
            value={value.value}
            onChange={handleChange}
            min={value.min}
            max={value.max}
            step={value.step}
          />
        </SliderArea>
      </IconBar>
    );
  }
);

export default BoundValueView;

const Label = styled.div``;

const SliderArea = styled.div`
  margin-left: 16px;
  width: 150px;
`;
