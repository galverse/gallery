import { styled } from 'stitches.config'

export default styled('span', {
  color: '$gray12',
  fontFamily: '$body',
  letterSpacing: 0,

  variants: {
    style: {
      h2: {
        fontWeight: 800,
        fontSize: 48,
      },
      h3: {
        fontWeight: 800,
        fontSize: 32,
      },
      h4: {
        fontWeight: 400,
        fontSize: 24,
        fontFamily: "SFCompactMedium",
        textTransform: "uppercase",
      },
      h5: {
        fontWeight: 600,
        fontSize: 20,
        fontFamily: "BureauGrot",
        textTransform: "uppercase",
        letterSpacing: ".07em",
        lineHeight: "19.24px",
      },
      h6: {
        fontWeight: 600,
        fontSize: 20,
        fontFamily: "BureauGrot",
        textTransform: "uppercase",
        letterSpacing: ".07em",
        lineHeight: "19.24px",
      },
      h7: {
        fontWeight: 700,
        fontSize: 18,
      },
      subtitle1: {
        fontWeight: 400,
        fontSize: 14,
        fontFamily: "SFCompactMedium",
        textTransform: "uppercase",
      },
      subtitle2: {
        fontWeight: 500,
        fontSize: 14,
      },
      subtitle3: {
        fontWeight: 500,
        fontSize: 12,
      },
      body1: {
        fontWeight: 400,
        fontSize: 14,
        fontFamily: "SFCompactMedium",
        textTransform: "uppercase",
      },
      body2: {
        fontWeight: 400,
        fontSize: 14,
      },
      body3: {
        fontWeight: 100,
        fontSize: 16,
        fontFamily: "SFCompactMedium",
        letterSpacing: ".03em",
      },
    },
    color: {
      subtle: {
        color: '$gray11',
      },
      white: {
        color: 'white',
      },
      error: {
        color: '$red11',
      },
    },
    italic: {
      true: {
        fontStyle: 'italic',
      },
    },
    ellipsify: {
      true: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      },
    },
  },

  defaultVariants: {
    style: 'body1',
  },
})
