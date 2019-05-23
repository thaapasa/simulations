import React from 'react';
import styled from 'styled-components';
import fastforward from '../icons/fast-forward.svg';
import logoGameOfLife from '../icons/logo-game-of-life.svg';
import logoLangtonsAnt from '../icons/logo-langtons-ant.svg';
import pause from '../icons/pause.svg';
import play from '../icons/play.svg';
import plus10 from '../icons/plus-10.svg';
import plus100 from '../icons/plus-100.svg';
import plus1000 from '../icons/plus-1000.svg';
import skip from '../icons/skip.svg';
import { Colors } from './Colors';
import { media } from './Styles';

const IconImage = styled.img`
  width: 32px;
  height: 32px;
`;

export interface IconProps {
  onClick?: () => void;
  className?: string;
}

function makeIcon(src: string, size?: number): React.FC<IconProps> {
  return (props: IconProps) => (
    <IconImage
      src={src}
      onClick={props.onClick}
      className={props.className}
      style={size ? { width: `${size}px`, height: `${size}px` } : undefined}
    />
  );
}

export const PlayIcon = makeIcon(play);
export const PauseIcon = makeIcon(pause);
export const FastForwardIcon = makeIcon(fastforward);
export const SkipIcon = makeIcon(skip);
export const Plus10Icon = makeIcon(plus10);
export const Plus100Icon = makeIcon(plus100);
export const Plus1000Icon = makeIcon(plus1000);
export const LangtonsAntLogo = makeIcon(logoLangtonsAnt, 48);
export const GameOfLifeLogo = makeIcon(logoGameOfLife, 48);

export const IconBar = styled.div`
  height: 48px;
  padding: 0 12px;
  border-radius: 24px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${Colors.white};
  font-weight: bold;
  background-color: ${Colors.black};

  & img {
    margin: 0 6px;
  }

  ${media.mobile`
    &.web {
      display: none;
    }
    margin-bottom: 8px;
  `}
`;
