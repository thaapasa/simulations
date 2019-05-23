import React from 'react';
import styled from 'styled-components';
import { Colors } from '../Colors';
import { LangtonModel } from './LangtonGame';

export const DebugDataView = ({ model }: { model: LangtonModel }) => (
  <DebugData>
    {dump('Center', model.centerPoint)}
    {dump('Render area', model.renderArea)}
    {dump('Tile range', model.tileRange)}
    {dump('Grid offset', model.gridOffset)}
  </DebugData>
);

const dump = (title: string, data: any) => (
  <div>
    {title}: {JSON.stringify(data)}
  </div>
);

const DebugData = styled.div`
  display: flex;
  flex-direction: column;
  color: ${Colors.white};
  font-size: 12px;
`;
