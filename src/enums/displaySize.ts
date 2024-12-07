export const DisplaySize = {
  MOBILE: 425,
  TABLET: 768,
  DESKTOP_S: 1024,
  DESKTOP_M: 1440,
} as const;

export type TDisplaySize = (typeof DisplaySize)[keyof typeof DisplaySize];
