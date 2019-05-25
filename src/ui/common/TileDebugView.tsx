import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import { Colors } from '../Colors';
import { TileCalculator } from '../common/TileCalculator';

const TileDebugView = observer(({ model }: { model: TileCalculator }) => (
  <DebugData>
    {dump('Center px', model.centerInPx)}
    {dump('Center tile', model.centerInTiles)}
    {dump('Render area', model.renderArea)}
    {dump('Tile range', model.tileRange)}
    {dump('Grid offset', model.gridOffset)}
  </DebugData>
));

export default TileDebugView;

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
