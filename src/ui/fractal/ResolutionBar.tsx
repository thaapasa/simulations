import { observer } from 'mobx-react';
import React from 'react';
import { BoundValue } from '../../util/BoundValue';
import BoundValueView from '../common/BoundValueView';

const ResolutionBar = observer(
  (props: { model: { resolution: BoundValue; render: () => void } }) => (
    <BoundValueView
      value={props.model.resolution}
      className="web"
      title="Resoluutio"
      onChange={props.model.render}
    />
  )
);

export default ResolutionBar;
