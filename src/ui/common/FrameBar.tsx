import { observer } from 'mobx-react';
import React from 'react';
import { IconBar } from '../Icons';

@observer
export default class FrameBar extends React.Component<{
  model: { frame: number };
}> {
  render() {
    const { model } = this.props;
    return (
      <IconBar className="TextItem">
        <div>Askel</div>
        <div>{model.frame}</div>
      </IconBar>
    );
  }
}
