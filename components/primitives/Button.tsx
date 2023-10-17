import { styled } from 'stitches.config'

const Button = styled('button', {
  outline: 'none',
  fontWeight: 700,
  fontSize: 16,
  fontFamily: '$button',
  transition: 'background-color 250ms linear',
  gap: '$space$2',
  display: 'inline-flex',
  alignItems: 'center',
  lineHeight: '20px',
  $$focusColor: '$colors$gray12',
  '&:focus-visible': {
    boxShadow: '0 0 0 2px $$focusColor',
  },
  '&:disabled': {
    backgroundColor: '$gray8',
    color: '$gray11',
  },
  '&:disabled:hover': {
    backgroundColor: '$gray8',
    color: '$gray11',
  },
  variants: {
    color: {
      primary: {
        backgroundColor: '$neutralBG',
        fontFamily: 'SFCompactMedium',
        textTransform: 'uppercase',
        boxShadow: '0 0 0 2px #A9A7B1',
        color: 'white',
        '&:hover': {
          backgroundColor: '$neutralBgSubtle',
        },
      },
      secondary: {
        backgroundColor: '$secondary4',
        color: '$primary12',
        '&:hover': {
          backgroundColor: '$secondary5',
        },
      },
      gray3: {
        backgroundColor: '$neutralBG',
        color: '$gray12',
        margin: '2px 2px 2px 2px',
        padding: '4px 20px 4px 20px',
        boxShadow: '0 0 0 2px #A9A7B1',
        '&:hover': {
          backgroundColor: '$gray4',
        },
        
      },
      gray4: {
        backgroundColor: '$neutralBG',
        color: '$gray12',
        margin: '8px 8px 8px 8px',
        padding: '1px 10px 1px 10px',
        boxShadow: '0 0 0 2px #A9A7B1',
        '&:hover': {
          backgroundColor: '$gray4',
        },        
      },
      avatarCircle: {
        backgroundColor: '$neutralBG',
        width: '38px',
        height: '38px',
        color: '$gray12',
        margin: '2px 2px 2px 2px',
        padding: '4px 20px 4px 20px',
        '&:hover': {
          backgroundColor: '$gray4',
        },
        
      },
      emptyPortfolio: {
        backgroundColor: '#343333',
        border: '1px solid #484747',
        fontFamily: 'bureauGrotMedium',
        fontSize: '14px',
        letterSpacing: '2.72px',
        fontWeight: '100',
      },
      ghost: {
        backgroundColor: 'transparent',
        p: 0,
      },
    },
    corners: {
      square: {
        borderRadius: 0,
      },
      rounded: {
        borderRadius: 8,
      },
      pill: {
        borderRadius: 99999,
      },
      circle: {
        borderRadius: '99999px',
        border:'none',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    size: {
      none: {},
      xs: {
        p: '$space$3',
        lineHeight: '16px',
        minHeight: 40,
      },
      small: {
        px: '$space$3',
        py: '$space$4',
        lineHeight: '12px',
        minHeight: 44,
      },
      medium: {
        px: '$space$5',
        py: '$space$3',
        minHeight: 44,
      },
      large: {
        px: '$space$5',
        py: '$space$4',
        minHeight: 52,
      },
    },
  },
  compoundVariants: [
    {
      size: 'xs',
      corners: 'circle',
      css: {
        height: 40,
        width: 40,
        p: 0,
      },
    },
    {
      size: 'small',
      corners: 'circle',
      css: {
        height: 44,
        width: 44,
        p: 0,
      },
    },
    {
      size: 'medium',
      corners: 'circle',
      css: {
        height: 44,
        width: 44,
        p: 0,
      },
    },
    {
      size: 'large',
      corners: 'circle',
      css: {
        height: 52,
        width: 52,
        p: 0,
      },
    },
  ],
  defaultVariants: {
    color: 'primary',
    corners: 'rounded',
    size: 'medium',
  },
})

export default Button
