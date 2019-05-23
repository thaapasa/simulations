import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import { IconBar } from '../Icons';

@observer
export default class FpsBar extends React.Component<{
  model: { fps: number };
}> {
  render() {
    const { model } = this.props;
    return (
      <IconBar className="web">
        <Label>FPS</Label>
        <FpsArea>{model.fps.toFixed(1)}</FpsArea>
      </IconBar>
    );
  }
}

const Label = styled.div``;

const FpsArea = styled.div`
  margin-left: 16px;
  text-align: right;
  width: 60px;
`;
