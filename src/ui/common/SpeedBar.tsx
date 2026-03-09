import { observer } from 'mobx-react';
import styled from 'styled-components';
import { BoundValue } from '../../util/BoundValue';
import { IconBar } from '../Icons';

const SpeedBar = observer(
  ({ model }: { model: { speed: BoundValue } }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      model.speed.value = Number(e.target.value);
    };

    return (
      <IconBar>
        <Label>Nopeus</Label>
        <SliderArea>
          <input
            type="range"
            value={model.speed.value}
            onChange={handleChange}
            min={model.speed.min}
            max={model.speed.max}
            step={model.speed.step}
          />
        </SliderArea>
      </IconBar>
    );
  }
);

export default SpeedBar;

const Label = styled.div``;

const SliderArea = styled.div`
  margin-left: 16px;
  width: 150px;
`;
