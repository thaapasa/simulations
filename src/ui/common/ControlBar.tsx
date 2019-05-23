import { observer } from 'mobx-react';
import React from 'react';
import { ModeHandler } from '../common/ModeHandler';
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

@observer
export default class ControlBar extends React.Component<{
  control: ModeHandler;
}> {
  render() {
    const { control } = this.props;
    return (
      <IconBar>
        {control.mode === 'play' ? (
          <PauseIcon onClick={control.pause} />
        ) : (
          <PlayIcon onClick={control.play} />
        )}
        <SkipIcon onClick={control.step} />
        {control.mode === 'fast' ? (
          <PauseIcon onClick={control.pause} />
        ) : (
          <FastForwardIcon onClick={control.fastForward} />
        )}
        <Plus10Icon onClick={this.skip10} />
        <Plus100Icon onClick={this.skip100} />
        <Plus1000Icon onClick={this.skip1000} />
      </IconBar>
    );
  }
  skip10 = () => this.props.control.skip(10);
  skip100 = () => this.props.control.skip(100);
  skip1000 = () => this.props.control.skip(1000);
}
