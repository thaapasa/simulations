import { observer } from 'mobx-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  GameOfLifeLogo,
  IconProps,
  LangtonsAntLogo,
  MandelbrotLogo,
} from './Icons';

const GameSelector = observer(() => {
  const navigate = useNavigate();
  return (
    <LogoBar>
      <LogoIcon
        logo={LangtonsAntLogo}
        navigate={navigate}
        path="/p/langtons-ant"
      />
      <LogoIcon
        logo={GameOfLifeLogo}
        navigate={navigate}
        path="/p/game-of-life"
      />
      <LogoIcon
        logo={MandelbrotLogo}
        navigate={navigate}
        path="/p/mandelbrot"
      />
    </LogoBar>
  );
});

export default GameSelector;

function LogoIcon({
  logo: LogoComponent,
  navigate,
  path,
}: {
  logo: React.FunctionComponent<IconProps>;
  navigate: (path: string) => void;
  path: string;
}) {
  return (
    <Logo>
      <LogoComponent onClick={() => navigate(path)} />
    </Logo>
  );
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
