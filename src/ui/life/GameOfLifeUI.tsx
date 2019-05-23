import { observer } from 'mobx-react';
import React from 'react';
import { BottomBar, UIContainer } from '../common/Components';

@observer
export default class GameOfLifeUI extends React.Component<{}> {
  render() {
    return (
      <UIContainer className="GameOfLifeUI">
        <BottomBar className="BottomBar">Hello!</BottomBar>
      </UIContainer>
    );
  }
}
