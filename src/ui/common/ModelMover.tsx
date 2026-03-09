import { useGesture } from '@use-gesture/react';
import { action } from 'mobx';
import { useEffect, useRef } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);
  // Track scale at pinch start so offset is applied relative to initial value
  const pinchStartScale = useRef(model.scale.value);

  useGesture(
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
      onWheel: action(({ event, delta }) => {
        event.preventDefault();
        stopCalc();
        const range = model.scale.max - model.scale.min;
        model.scale.value = bound(
          model.scale.value - (delta[1] / 500) * (range / 5),
          model.scale.min,
          model.scale.max
        );
        model.render();
      }),
      onPinchStart: action(() => {
        pinchStartScale.current = model.scale.value;
        stopCalc();
      }),
      onPinch: action(({ event, offset }) => {
        event?.preventDefault();
        stopCalc();
        // offset[0] is the cumulative scale factor (starts at 1)
        model.scale.value = bound(
          pinchStartScale.current * offset[0],
          model.scale.min,
          model.scale.max
        );
        model.render();
      }),
    },
    {
      target: containerRef,
      wheel: { eventOptions: { passive: false } },
      pinch: { eventOptions: { passive: false } },
      drag: { filterTaps: true },
    }
  );

  // Prevent Safari gesturestart/gesturechange default zoom
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const prevent = (e: Event) => e.preventDefault();
    el.addEventListener('gesturestart', prevent, { passive: false });
    el.addEventListener('gesturechange', prevent, { passive: false });
    return () => {
      el.removeEventListener('gesturestart', prevent);
      el.removeEventListener('gesturechange', prevent);
    };
  }, []);

  return (
    <Container ref={containerRef} className="ModelMover">
      {children}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  touch-action: none;
`;
