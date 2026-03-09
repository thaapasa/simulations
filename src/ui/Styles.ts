import { css, RuleSet } from 'styled-components';

// See responsive UI specs at https://material.io/guidelines/layout/responsive-ui.html
export type ScreenSizeClassName =
  | 'mobile-portrait'
  | 'mobile-landscape'
  | 'web'
  | 'large';

export const mobilePortraitMaxWidth = 600;
export const mobileLandscapeMaxWidth = 840;
export const largeDeviceMinWidth = 1400;

type CssArgs = [TemplateStringsArray, ...RuleSet[]];

export const media = {
  mobilePortrait: (s: TemplateStringsArray, ...i: RuleSet[]) => css`
    @media screen and (orientation: portrait) and (max-width: ${mobilePortraitMaxWidth -
        1}px) {
      ${css(...([s, ...i] as CssArgs))}
    }
  `,
  mobileLandscape: (s: TemplateStringsArray, ...i: RuleSet[]) => css`
    @media screen and (orientation: landscape) and (max-width: ${mobileLandscapeMaxWidth -
        1}px) {
      ${css(...([s, ...i] as CssArgs))}
    }
  `,
  mobile: (s: TemplateStringsArray, ...i: RuleSet[]) => css`
    @media screen and (max-width: ${mobileLandscapeMaxWidth - 1}px) {
      ${css(...([s, ...i] as CssArgs))}
    }
  `,
  web: (s: TemplateStringsArray, ...i: RuleSet[]) => css`
    @media screen and (min-width: ${mobilePortraitMaxWidth}px) and (max-width: ${mobileLandscapeMaxWidth -
        1}px) {
      ${css(...([s, ...i] as CssArgs))}
    }
  `,
  largeDevice: (s: TemplateStringsArray, ...i: RuleSet[]) => css`
    @media screen and (min-width: ${largeDeviceMinWidth}px) {
      ${css(...([s, ...i] as CssArgs))}
    }
  `,
};
