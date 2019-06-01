import styled from 'styled-components';
import { media } from '../Styles';

export const UIContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 32px;
  padding-top: 16px;
  margin: 0;

  ${media.mobile`
    padding: 16px;
  `}
`;

export const ToolBar = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  &.Center {
    justify-content: center;
  }

  &.TopBar {
    margin-bottom: 16px;
  }

  &.BottomBar {
    margin-top: 16px;

    ${media.mobilePortrait`
      flex-direction: column;
    `}
  }
`;
