import { FC, useEffect, useState } from 'react'
import { AnimatedOverlay, Content } from 'components/primitives/Dialog'
import { useAccount, useDisconnect } from 'wagmi'
import { useENSResolver } from 'hooks'
import { Box, Button, Flex, Grid, Text } from 'components/primitives'
import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import {
  DropdownMenuItem,
  DropdownMenuContent,
} from 'components/primitives/Dropdown'
import { Avatar } from 'components/primitives/Avatar'
import Image from 'next/image'
// import ThemeSwitcher from './ThemeSwitcher'
import Jazzicon from 'react-jazzicon/dist/Jazzicon'
import { jsNumberForAddress } from 'react-jazzicon'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChartLine,
  faClose,
  faCopy,
  faHand,
  faList,
  faRightFromBracket,
  faStore,
} from '@fortawesome/free-solid-svg-icons'
import CopyText from 'components/common/CopyText'
import GalverseLogo from 'public/home/logos/brand-logo.svg'
import Link from 'next/link'
// import Wallet from './Wallet'
import { useRouter } from 'next/router'

export const AccountSidebar: FC = () => {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const router = useRouter()
  const {
    avatar: ensAvatar,
    shortAddress,
    shortName: shortEnsName,
  } = useENSResolver(address)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [router.asPath])

  const trigger = (
    <Button
      css={{
        justifyContent: 'center',
      }}
      corners="circle"
      type="button"
      color="avatarCircle"
    >
      {ensAvatar ? (
        <Avatar size="medium" src={ensAvatar} />
      ) : (
        <Jazzicon diameter={44} seed={jsNumberForAddress(address as string)} />
      )}
    </Button>
  )

  return (
    <DropdownMenu>
      {/* Trigger */}
      <DropdownMenuTrigger asChild>
        {ensAvatar ? (
          <Avatar size="large" style={{width:38,height:38}} src={ensAvatar} />
        ) : (
          <Jazzicon
            diameter={52}
            seed={jsNumberForAddress(address as string)}
          />
        )}
      </DropdownMenuTrigger>
  
      {/* Content */}
      <DropdownMenuContent style={{fontFamily: 'SF Pro Display', padding: '20px 20px 4px 20px', textTransform: 'uppercase', textAlign: 'left', fontWeight: '600'}}>
        <DropdownMenuItem style={{marginTop: '16px'}} asChild>
          <Link href={`/portfolio/${address}?tab=items`} legacyBehavior>
            <a>My Collection</a>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem style={{padding:'16px 0px'}} onSelect={() => disconnect()}>Disconnect</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
