import * as TabsPrimitive from '@radix-ui/react-tabs'
import { styled } from 'stitches.config'

const TabsList = styled(TabsPrimitive.List, {
  display: 'flex',
  gap: '$5',
  borderBottom: '1px solid $gray5',
  mt: '$5',
  mb: '$4',
})


const TabsTrigger = styled(TabsPrimitive.Trigger, {
  fontWeight: '700',
  textTransform: 'uppercase',
  fontFamily: 'SF Pro Display',
  lineHeight: '26.64px',
  color: '#FAFAFA',
  fontSize: '18px',
  pb: '$3',
  '&[data-state="active"]': {
    boxShadow:
      'inset 0 -2px 0 0 var(--colors-primary9), 0 2px 0 0 var(--colors-primary9)',
  },
})

const TabsContent = styled(TabsPrimitive.Content, {})

export { TabsList, TabsTrigger, TabsContent }
