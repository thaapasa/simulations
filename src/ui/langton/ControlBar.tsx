import { observer } from 'mobx-react';
import React from 'react';
import {
  FastForwardIcon,
  IconBar,
  PauseIcon,
  PlayIcon,
  Plus1000Icon,
  Plus100Icon,
  Plus10Icon,
  SkipIcon,
} from '../Icons';
import { LangtonModel } from './LangtonGame';

@observer
export default class ControlBar extends React.Component<{
  model: LangtonModel;
}> {
  render() {
    const { model } = this.props;
    return (
      <IconBar>
        {model.visibleMode === 'play' ? (
          <PauseIcon onClick={model.pause} />
        ) : (
          <PlayIcon onClick={model.play} />
        )}
        <SkipIcon onClick={model.step} />
        {model.visibleMode === 'fast' ? (
          <PauseIcon onClick={model.pause} />
        ) : (
          <FastForwardIcon onClick={model.fastForward} />
        )}
        <Plus10Icon onClick={this.skip10} />
        <Plus100Icon onClick={this.skip100} />
        <Plus1000Icon onClick={this.skip1000} />
      </IconBar>
    );
  }
  skip10 = () => this.props.model.skip(10);
  skip100 = () => this.props.model.skip(100);
  skip1000 = () => this.props.model.skip(1000);
}
