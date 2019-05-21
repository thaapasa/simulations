import Slider from '@material-ui/lab/Slider';
import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import { IconBar } from '../Icons';
import { LangtonModel, MaxScale, MinScale } from './LangtonGame';

@observer
export default class ZoomBar extends React.Component<{
  model: LangtonModel;
}> {
  render() {
    const { model } = this.props;
    return (
      <IconBar>
        <Label>Zoom</Label>
        <SliderArea>
          <Slider
            value={model.scale}
            onChange={this.onChange}
            min={MinScale}
            max={MaxScale}
            step={0.05}
          />
        </SliderArea>
      </IconBar>
    );
  }

  onChange = (_: React.ChangeEvent<{}>, value: number) => {
    this.props.model.scale = value;
    this.props.model.render();
  };
}

const Label = styled.div``;

const SliderArea = styled.div`
  margin-left: 16px;
  width: 150px;
`;
