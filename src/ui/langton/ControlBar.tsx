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
        {model.mode === 'play' ? (
          <PauseIcon onClick={model.control.pause} />
        ) : (
          <PlayIcon onClick={model.control.play} />
        )}
        <SkipIcon onClick={model.control.step} />
        {model.mode === 'fast' ? (
          <PauseIcon onClick={model.control.pause} />
        ) : (
          <FastForwardIcon onClick={model.control.fastForward} />
        )}
        <Plus10Icon onClick={this.skip10} />
        <Plus100Icon onClick={this.skip100} />
        <Plus1000Icon onClick={this.skip1000} />
      </IconBar>
    );
  }
  skip10 = () => this.props.model.control.skip(10);
  skip100 = () => this.props.model.control.skip(100);
  skip1000 = () => this.props.model.control.skip(1000);
}
