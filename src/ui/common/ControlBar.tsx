import { observer } from 'mobx-react';
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

const ControlBar = observer(({ control }: { control: ModeHandler }) => (
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
    <Plus10Icon onClick={() => control.skip(10)} />
    <Plus100Icon onClick={() => control.skip(100)} />
    <Plus1000Icon onClick={() => control.skip(1000)} />
  </IconBar>
));

export default ControlBar;
