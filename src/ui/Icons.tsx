import React from 'react';
import styled from 'styled-components';
import fastforward from '../icons/fast-forward.svg';
import pause from '../icons/pause.svg';
import play from '../icons/play.svg';
import skip from '../icons/skip.svg';
import { Colors } from './Colors';

const IconImage = styled.img`
  width: 32px;
  height: 32px;
`;

function makeIcon(src: string) {
  return (props: { onClick?: () => void; className?: string }) => (
    <IconImage src={src} onClick={props.onClick} className={props.className} />
  );
}

export const PlayIcon = makeIcon(play);
export const PauseIcon = makeIcon(pause);
export const FastForwardIcon = makeIcon(fastforward);
export const SkipIcon = makeIcon(skip);

export const IconBar = styled.div`
  height: 48px;
  padding: 0 12px;
  border-radius: 24px;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.black};

  & img {
    margin: 0 6px;
  }
`;
