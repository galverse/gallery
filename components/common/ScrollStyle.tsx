import React, { useEffect, useRef } from 'react';
import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.css';
import { styled } from 'stitches.config';

const ScrollableDiv = styled('div', {
    height: 'calc(100vh)',
    overflow: 'auto',
    
    '.simplebar-scrollbar::before': {
        backgroundColor: '#C1C1C1',
        opacity: '0',
        transition: 'opacity 0.3s',
    },
    
    '.simplebar-track.simplebar-vertical:hover .simplebar-scrollbar::before': {
        opacity: '1',
        backgroundColor: '#C1C1C1',
    },
    
    '.simplebar-scrollbar::before:hover': {
        backgroundColor: '#A1A1A1', // A slightly different color for the hover effect on the thumb.
    }
});

const ScrollableArea: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const scrollableRef = useRef<HTMLDivElement | null>(null);
  
    useEffect(() => {
      let scrollEndTimeout: NodeJS.Timeout;
      
      if (scrollableRef.current) {
        const simpleBarInstance = new SimpleBar(scrollableRef.current);
        const scrollElement = simpleBarInstance.getScrollElement();
  
        const onScroll = () => {
          clearTimeout(scrollEndTimeout);
          
          if (scrollElement) {
            // Set opacity to 1 when scrolling
            scrollElement.style.setProperty('--scrollbar-opacity', '1');
            
            // After 500ms without any scroll event, set opacity back to 0.1
            scrollEndTimeout = setTimeout(() => {
              scrollElement.style.setProperty('--scrollbar-opacity', '0.1');
            }, 500);
          }
        };
  
        if (scrollElement) {
          scrollElement.addEventListener('scroll', onScroll);
        }
  
        return () => {
          if (scrollElement) {
            scrollElement.removeEventListener('scroll', onScroll);
          }
          clearTimeout(scrollEndTimeout);
        };
      }
    }, []);
  
    return <ScrollableDiv ref={scrollableRef}>{children}</ScrollableDiv>;
  };
  
  
  export default ScrollableArea;
