import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import { Colors } from '../Colors';
import { IconBar } from '../Icons';
import { LangtonModel } from './LangtonGame';

@observer
export default class FrameBar extends React.Component<{
  model: LangtonModel;
}> {
  render() {
    const { model } = this.props;
    return (
      <IconBar>
        <StepText>
          <StepPart>Askel</StepPart>
          <StepPart>{model.frame}</StepPart>
        </StepText>
      </IconBar>
    );
  }
}

const StepText = styled.div`
  color: ${Colors.white};
  font-weight: bold;
  width: 130px;
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StepPart = styled.div``;
