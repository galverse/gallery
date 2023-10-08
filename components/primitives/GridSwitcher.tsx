import { styled } from '@stitches/react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import denseGridPath from 'public/icons/ux/dense-grid.svg';
import Image from 'next/image'
import gridPath from 'public/icons/ux/grid.svg';
import { useGrid } from 'context/GridContextProvider';


const StyledGridSwitcher = styled(SwitchPrimitive.Root, {
  borderRadius: 8,
  cursor: 'pointer',
  all: 'unset',
  width: 40,
  height: 40,
  marginRight: '80px',
  background: '',
  color: '$gray12',
  p: '$3',
  position: 'relative',
  transition: 'background-color 250ms linear',
  $$focusColor: '$colors$white',
  '&[data-state="checked"]': { backgroundColor: 'transparent' },
  '&:focus-visible': {
    boxShadow: '0 0 0 1px $$focusColor',
  },
  // Position the icons
  '& > img, & > object': {
    cursor: 'pointer',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  '& > img:nth-child(1), & > object:nth-child(1)': {
    left: 65,
    top: 8,
  },
  '& > img:nth-child(2), & > object:nth-child(2)': {
    left: 15,
    top: 8,
  },
  // Hide the thumb
  '& [data-state="checked"] ~ [data-part="thumb"], & [data-state="unchecked"] ~ [data-part="thumb"]': {
    opacity: 0,
  },
});

const Thumb = styled(SwitchPrimitive.Thumb, {
  cursor: 'pointer',
  display: 'block',
  width: 40,
  height: 40,
  backgroundColor: 'transparent',
  transition: 'transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  transform: 'translateX(4px)',
  willChange: 'transform',
  $$focusColor: '$colors$gray12',
  boxShadow: '0 0 0 1px $$borderColor',
  '&[data-state="checked"]': { transform: 'translateX(22px)' },
});




type SwitchProps = SwitchPrimitive.SwitchProps & {
  checked: boolean;
  onChange: () => void;
};

const GridSwitcher: React.FC<SwitchProps> = ({ checked, onChange, ...props }) => {
  return (
    <StyledGridSwitcher checked={checked} onCheckedChange={onChange} {...props}>
      <Image src={gridPath} alt="Grid Icon" style={{ opacity: checked ? 1 : 0.5, backgroundColor: checked ? '$primary5' : 'transparent' }} />
      <Image src={denseGridPath} alt="Dense Grid Icon" style={{ opacity: checked ? 0.5 : 1, backgroundColor: checked ? '$primary5' : 'transparent' }} />
      <Thumb />
    </StyledGridSwitcher>
  );
};



export default GridSwitcher;
