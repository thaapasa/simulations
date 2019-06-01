import { History } from 'history';
import { observer } from 'mobx-react';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import {
  GameOfLifeLogo,
  IconProps,
  LangtonsAntLogo,
  MandelbrotLogo,
} from './Icons';

@observer
export default class GameSelector extends React.Component<
  RouteComponentProps<{}>
> {
  render() {
    return (
      <LogoBar>
        <LogoIcon
          logo={LangtonsAntLogo}
          history={this.props.history}
          path="/p/langtons-ant"
        />
        <LogoIcon
          logo={GameOfLifeLogo}
          history={this.props.history}
          path="/p/game-of-life"
        />
        <LogoIcon
          logo={MandelbrotLogo}
          history={this.props.history}
          path="/p/mandelbrot"
        />
      </LogoBar>
    );
  }
}

class LogoIcon extends React.Component<{
  logo: React.FunctionComponent<IconProps>;
  history: History;
  path: string;
}> {
  render() {
    return (
      <Logo>
        <this.props.logo onClick={this.navigate} />
      </Logo>
    );
  }

  navigate = () => {
    this.props.history.push(this.props.path);
  };
}

const LogoBar = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Logo = styled.div`
  margin: 0 8px;
`;
