import { css, SimpleInterpolation } from 'styled-components';

// See responsive UI specs at https://material.io/guidelines/layout/responsive-ui.html
export type ScreenSizeClassName =
  | 'mobile-portrait'
  | 'mobile-landscape'
  | 'web'
  | 'large';

export const mobilePortraitMaxWidth = 600;
export const mobileLandscapeMaxWidth = 840;
export const largeDeviceMinWidth = 1400;

export const media = {
  mobilePortrait: (s: TemplateStringsArray, ...i: SimpleInterpolation[]) => css`
    @media screen and (orientation: portrait) and (max-width: ${mobilePortraitMaxWidth -
        1}px) {
      ${css(s, ...i)}
    }
  `,
  mobileLandscape: (
    s: TemplateStringsArray,
    ...i: SimpleInterpolation[]
  ) => css`
    @media screen and (orientation: landscape) and (max-width: ${mobileLandscapeMaxWidth -
        1}px) {
      ${css(s, ...i)}
    }
  `,
  mobile: (s: TemplateStringsArray, ...i: SimpleInterpolation[]) => css`
    @media screen and (max-width: ${mobileLandscapeMaxWidth - 1}px) {
      ${css(s, ...i)}
    }
  `,
  web: (s: TemplateStringsArray, ...i: SimpleInterpolation[]) => css`
    @media screen and (min-width: ${mobilePortraitMaxWidth}px) and (max-width: ${mobileLandscapeMaxWidth -
        1}px) {
      ${css(s, ...i)}
    }
  `,
  largeDevice: (s: TemplateStringsArray, ...i: SimpleInterpolation[]) => css`
    @media screen and (min-width: ${largeDeviceMinWidth}px) {
      ${css(s, ...i)}
    }
  `,
};
