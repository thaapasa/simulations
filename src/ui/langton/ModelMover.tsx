import React from 'react';
import { useGesture } from 'react-use-gesture';
import styled from 'styled-components';
import { LangtonModel } from './LangtonGame';

export function ModelMover({
  model,
  children,
}: {
  model: LangtonModel;
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
    },
    { event: { passive: false } }
  );
  return <Container {...bind()}>{children}</Container>;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
