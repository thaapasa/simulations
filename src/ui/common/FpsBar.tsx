import { observer } from 'mobx-react';
import { IconBar } from '../Icons';

const FpsBar = observer(
  ({ model }: { model: { fps: number } }) => (
    <IconBar className="web TextItem">
      <div>FPS</div>
      <div>{model.fps.toFixed(1)}</div>
    </IconBar>
  )
);

export default FpsBar;
