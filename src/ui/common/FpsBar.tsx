import { observer } from 'mobx-react';
import React from 'react';
import { IconBar } from '../Icons';

@observer
export default class FpsBar extends React.Component<{
  model: { fps: number };
}> {
  render() {
    const { model } = this.props;
    return (
      <IconBar className="web TextItem">
        <div>FPS</div>
        <div>{model.fps.toFixed(1)}</div>
      </IconBar>
    );
  }
}
