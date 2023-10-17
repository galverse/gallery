import { globalCss } from 'stitches.config';
import SimpleBar from 'simplebar';

export const globalStyles = globalCss({
  '::-webkit-scrollbar': {
    width: '6px',
    position: 'relative',
    top: '107px',
    left: '351px',
    maxHeight: '111px',
    borderRadius: '999px',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  '::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
    boxShadow: 'none !important',
    height: '111px',
    overflowY: 'scroll',
  },
  '::-webkit-scrollbar-thumb': {
    visibility: 'hidden',
    background: 'transparent',
  },
  
  // Show the scrollbar thumb on hover over the 
  ':hover::-webkit-scrollbar-thumb': {
    background: '#C1C1C1',
    borderRadius: '999px',
    visibility: 'visible',
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
