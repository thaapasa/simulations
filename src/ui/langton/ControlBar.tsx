import { observer } from 'mobx-react';
import React from 'react';
import {
  FastForwardIcon,
  IconBar,
  PauseIcon,
  PlayIcon,
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
        <FastForwardIcon />
      </IconBar>
    );
  }
}
