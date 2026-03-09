import { observer } from 'mobx-react';
import { IconBar } from '../Icons';

const ProgressBar = observer(
  ({ model }: { model: { progress: string } }) => (
    <IconBar className="TextItem">
      <div>Laskenta</div>
      <div>{model.progress}</div>
    </IconBar>
  )
);

export default ProgressBar;
