import { observer } from 'mobx-react';
import styled from 'styled-components';
import { PATTERNS } from '../../game/gameoflife/Patterns';
import { Colors } from '../Colors';
import { IconBar } from '../Icons';
import { media } from '../Styles';
import { GameOfLifeModel } from './GameOfLifeModel';

const BrushSelector = observer(
  ({ model }: { model: GameOfLifeModel }) => (
    <IconBar>
      {PATTERNS.map((pattern, i) => (
        <BrushButton
          key={i}
          $active={model.selectedBrushIndex === i}
          onClick={() => model.selectBrush(i)}
        >
          {pattern.name}
        </BrushButton>
      ))}
      <RotateButton onClick={() => model.rotateBrush()}>↻</RotateButton>
      <ClearButton onClick={() => model.clearGrid()}>Tyhjennä</ClearButton>
    </IconBar>
  )
);

export default BrushSelector;

const BrushButton = styled.button<{ $active: boolean }>`
  background: ${p => (p.$active ? Colors.darkBlue : 'transparent')};
  color: ${Colors.white};
  border: 1px solid ${Colors.darkBlue};
  border-radius: 12px;
  padding: 4px 10px;
  margin: 0 3px;
  cursor: pointer;
  font-size: 13px;
  font-weight: bold;
  white-space: nowrap;

  &:hover {
    background: ${p => (p.$active ? Colors.darkBlue : Colors.reallyDarkBlue)};
  }

  ${media.mobile`
    padding: 4px 6px;
    font-size: 11px;
  `}
`;

const RotateButton = styled.button`
  background: transparent;
  color: ${Colors.white};
  border: 1px solid ${Colors.darkBlue};
  border-radius: 50%;
  width: 32px;
  height: 32px;
  margin-left: 6px;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${Colors.reallyDarkBlue};
  }
`;

const ClearButton = styled.button`
  background: transparent;
  color: ${Colors.lightRed};
  border: 1px solid ${Colors.darkRed};
  border-radius: 12px;
  padding: 4px 10px;
  margin-left: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: bold;
  white-space: nowrap;

  &:hover {
    background: ${Colors.darkRed};
    color: ${Colors.white};
  }

  ${media.mobile`
    padding: 4px 6px;
    font-size: 11px;
  `}
`;
