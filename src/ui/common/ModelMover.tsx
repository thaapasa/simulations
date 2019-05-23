import React from 'react';
import { useGesture } from 'react-use-gesture';
import styled from 'styled-components';
import { bound } from '../../util/Util';
import { Model } from './Model';

export function ModelMover({
  model,
  children,
}: {
  model: Model;
  children?: any;
}) {
  const bind = useGesture(
    {
      onDrag: s => {
        model.centerPoint = {
          x: model.centerPoint.x - (s.xy[0] - s.previous[0]),
          y: model.centerPoint.y + (s.xy[1] - s.previous[1]),
        };
        model.render();
      },
      onWheel: s => {
        model.scale = bound(
          model.scale - s.xy[1] / 2000,
          model.minScale,
          model.maxScale
        );
        model.render();
      },
      onPinch: s => {
        model.scale = bound(
          model.scale - (s.previous[0] - s.da[0]) / 100,
          model.minScale,
          model.maxScale
        );
        model.render();
      },
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
