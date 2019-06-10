import { observer } from 'mobx-react';
import React from 'react';
import { BoundValue } from '../../util/BoundValue';
import BoundValueView from './BoundValueView';

const ZoomBar = observer(
  (props: { model: { scale: BoundValue; render: () => void } }) => (
    <BoundValueView
      value={props.model.scale}
      className="web"
      title="Zoom"
      onChange={props.model.render}
    />
  )
);

export default ZoomBar;
