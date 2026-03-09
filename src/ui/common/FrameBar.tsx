import { observer } from 'mobx-react';
import { IconBar } from '../Icons';

const FrameBar = observer(
  ({ model }: { model: { frame: number } }) => (
    <IconBar className="TextItem">
      <div>Askel</div>
      <div>{model.frame}</div>
    </IconBar>
  )
);

export default FrameBar;
