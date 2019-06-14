import { observer } from 'mobx-react';
import React from 'react';
import { IconBar } from '../Icons';

@observer
export default class ProgressBar extends React.Component<{
  model: { progress: string };
}> {
  render() {
    const { model } = this.props;
    return (
      <IconBar className="TextItem">
        <div>Laskenta</div>
        <div>{model.progress}</div>
      </IconBar>
    );
  }
}
