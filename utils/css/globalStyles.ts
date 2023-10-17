import { globalCss } from '@stitches/react';

export const globalStyles = globalCss({
  '::-webkit-scrollbar': {
    width: '6px',
    position: 'relative',
    top: '107px',
    left: '351px',
    maxHeight: '111px',
    borderRadius: '999px',
    background: 'transparent'
  },
  '::-webkit-scrollbar-track': {
    background: 'transparent',
    height: '111px'
  },
  '::-webkit-scrollbar-thumb': {
    background: '#C1C1C1',
    borderRadius: '999px'
  },
  '::-webkit-scrollbar-thumb:hover': {
    background: '#C1C1C1',
  },
  // For Firefox:
  body: {
    scrollbarWidth: 'thin',
    scrollbarColor: '#888 #f1f1f1',
  },
});
