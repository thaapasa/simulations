import { action } from 'mobx';
import React from 'react';
import {
  CoordinatesGestureState,
  DistanceAngleGestureState,
  useGesture,
} from 'react-use-gesture';
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
      onDragStart: action((_: CoordinatesGestureState) => {
        if (useDragPoint) {
          model.dragPoint.x = 0;
          model.dragPoint.y = 0;
          stopCalc();
        }
      }),
      onDrag: action((s: CoordinatesGestureState) => {
        if (useDragPoint) {
          stopCalc();
          model.dragPoint = {
            x: model.dragPoint.x - (s.xy[0] - s.previous[0]),
            y: model.dragPoint.y + (s.xy[1] - s.previous[1]),
          };
          model.repaint();
        } else {
          model.centerPoint = {
            x: model.centerPoint.x - (s.xy[0] - s.previous[0]),
            y: model.centerPoint.y + (s.xy[1] - s.previous[1]),
          };
          model.render();
        }
      }),
      onDragEnd: action((s: CoordinatesGestureState) => {
        if (useDragPoint) {
          model.dragPoint = {
            x: model.dragPoint.x - (s.xy[0] - s.previous[0]),
            y: model.dragPoint.y + (s.xy[1] - s.previous[1]),
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
      onWheel: action((s: CoordinatesGestureState) => {
        stopCalc();
        model.scale.value = bound(
          model.scale.value - s.xy[1] / 2000,
          model.scale.min,
          model.scale.max
        );
        model.render();
      }),
      onPinch: action((s: DistanceAngleGestureState) => {
        stopCalc();
        model.scale.value = bound(
          model.scale.value - (s.previous[0] - s.da[0]) / 70,
          model.scale.min,
          model.scale.max
        );
        model.render();
      }),
    },
    { event: { passive: false } }
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
