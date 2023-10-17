import { styled } from '@stitches/react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import denseGridPath from 'public/icons/ux/dense-grid.svg';
import Image from 'next/image'
import gridPath from 'public/icons/ux/grid.svg';
import { useGrid } from 'context/GridContextProvider';


const StyledGridSwitcher = styled(SwitchPrimitive.Root, {
  all: 'unset',
  width: "160px",
  height: "58px",
  position: 'relative',
  backgroundColor: '#282828',  // Default background
  borderRadius: '9999px', 
});

const ActiveBackground = styled('div', {
  width: '50%',  // Half the width of the container
  height: '58px',
  backgroundColor: '#464646',  // Active background
  borderRadius: '10px',
  position: 'absolute',
  left: 0,  // Default to left
  transition: 'left 0.3s ease',  // Smooth transition
  '&[data-state="checked"]': {
    borderRadius: '10px',
    left: '50%',  // Move to the right side when checked
  },
});

const IconContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-around',  // Space out the icons
  alignItems: 'center',
  width: '100%',
  height: '100%',
});

const iconStyle = {
  width: '25px',
  height: '25px',
  // You might want to adjust positioning, this is just an example
};

type SwitchProps = SwitchPrimitive.SwitchProps & {
  checked: boolean;
  onChange: () => void;
};

const GridSwitcher: React.FC<SwitchProps> = ({ checked, onChange, ...props }) => {
  return (
    <StyledGridSwitcher checked={checked} onCheckedChange={onChange} {...props}>
      <ActiveBackground data-state={checked ? 'checked' : 'unchecked'} />
      <IconContainer>
        <Image src={denseGridPath} alt="Dense Grid Icon" style={{ ...iconStyle, opacity: checked ? 0.5 : 1, zIndex:2}} />
        <Image src={gridPath} alt="Grid Icon" style={{ ...iconStyle, opacity: checked ? 1 : 0.5, zIndex:2}} />
      </IconContainer>
    </StyledGridSwitcher>
  );
};

export default GridSwitcher;
