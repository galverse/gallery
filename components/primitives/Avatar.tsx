import { styled } from 'stitches.config'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import Image from 'next/image'
import defaultAvatar from '/public/icons/ux/avatar-bg.png'
import {
  ComponentPropsWithoutRef,
  ComponentProps,
  ElementRef,
  forwardRef,
} from 'react'

type AvatarRootProps = ComponentProps<typeof AvatarRoot>

const AvatarRoot = styled(AvatarPrimitive.Root, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
  overflow: 'hidden',
  userSelect: 'none',
  flexShrink: 0,
  variants: {
    size: {
      xs: {
        size: 16,
      },
      small: {
        size: 24,
      },
      medium: {
        size: 36,
      },
      large: {
        size: 48,
      },
      xl: {
        size: 56,
      },
      xxl: {
        size: 64,
      },
    },
    corners: {
      rounded: {
        borderRadius: 4,
      },
      circle: {
        borderRadius: '100%',
      },
    },
  },
  defaultVariants: {
    size: 'medium',
    corners: 'circle',
  },
})

const AvatarImage = styled(AvatarPrimitive.Image, {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 'inherit',
  cursor: 'pointer'
})

const AvatarFallback = styled(AvatarPrimitive.Fallback, {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$gray1',
})

export const Avatar = forwardRef<
  ElementRef<typeof AvatarImage>,
  ComponentPropsWithoutRef<typeof AvatarImage> & {
    fallback?: string | JSX.Element
    size?: AvatarRootProps['size']
    corners?: AvatarRootProps['corners']
  }
>(({ size, corners, fallback, src, ...props }, forwardedRef) => {
  // Check if src is an object and has a src property
  const imageSrc = typeof src === 'object' && 'src' in src ? (src as any).src : src;
  const isSrcAvailable = Boolean(imageSrc);

  console.log('Avatar imageSrc:', imageSrc);
  console.log('isSrcAvailable:', isSrcAvailable);

  return (
    <AvatarRoot size={size} corners={corners}>
      {isSrcAvailable ? (
        <AvatarImage ref={forwardedRef} src={imageSrc} {...props} />
      ) : (
        <AvatarFallback delayMs={0}>
          {typeof fallback === "string" ? (
            <Image src={defaultAvatar} alt="Default Avatar" width={100} height={100}  />
          ) : (
            fallback
          )}
        </AvatarFallback>
      )}
    </AvatarRoot>
  )
})


