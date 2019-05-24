import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import { Colors } from '../Colors';
import { LangtonModel } from './LangtonModel';

export const DebugDataView = observer(({ model }: { model: LangtonModel }) => (
  <DebugData>
    {dump('Center', model.centerPoint)}
    {dump('Render area', model.tileCalc.renderArea)}
    {dump('Tile range', model.tileCalc.tileRange)}
    {dump('Grid offset', model.tileCalc.gridOffset)}
  </DebugData>
));

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
