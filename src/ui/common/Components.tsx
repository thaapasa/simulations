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
  margin: 0;

  ${media.mobile`
    padding: 16px;
  `}
`;

export const BottomBar = styled.div`
  display: flex;
  width: 100%;
  margin-top: 32px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  ${media.mobilePortrait`
    flex-direction: column;
  `}
`;
