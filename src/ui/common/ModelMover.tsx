import { useGesture } from '@use-gesture/react';
import { action } from 'mobx';
import styled from 'styled-components';
import { bound, noop } from '../../util/Util';
import { Model } from './Model';

export function ModelMover({
  model,
  children,
  useDragPoint,
}: {
  model: Model;
  children?: any;
  useDragPoint: boolean;
}) {
  const stopCalc = model.stopCalculation || noop;
  const bind = useGesture(
    {
      onDragStart: action(() => {
        if (useDragPoint) {
          model.dragPoint.x = 0;
          model.dragPoint.y = 0;
          stopCalc();
        }
      }),
      onDrag: action(({ delta }) => {
        if (useDragPoint) {
          stopCalc();
          model.dragPoint = {
            x: model.dragPoint.x - delta[0],
            y: model.dragPoint.y + delta[1],
          };
          model.repaint();
        } else {
          model.centerPoint = {
            x: model.centerPoint.x - delta[0],
            y: model.centerPoint.y + delta[1],
          };
          model.render();
        }
      }),
      onDragEnd: action(({ delta }) => {
        if (useDragPoint) {
          model.dragPoint = {
            x: model.dragPoint.x - delta[0],
            y: model.dragPoint.y + delta[1],
          };
          model.centerPoint = {
            x: model.centerPoint.x + model.dragPoint.x,
            y: model.centerPoint.y + model.dragPoint.y,
          };
          model.dragPoint.x = 0;
          model.dragPoint.y = 0;
          model.render();
        }
      }),
      onWheel: action(({ delta }) => {
        stopCalc();
        model.scale.value = bound(
          model.scale.value - delta[1] / 2000,
          model.scale.min,
          model.scale.max
        );
        model.render();
      }),
      onPinch: action(({ offset }) => {
        stopCalc();
        model.scale.value = bound(
          offset[0] / 100,
          model.scale.min,
          model.scale.max
        );
        model.render();
      }),
    },
    { eventOptions: { passive: false } }
  );
  return (
    <Container {...bind()} className="ModelMover">
      {children}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
