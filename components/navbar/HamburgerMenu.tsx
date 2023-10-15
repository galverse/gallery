import { Anchor, Box, Button, Flex, Text } from 'components/primitives'
import { Avatar } from 'components/primitives/Avatar'
import * as RadixDialog from '@radix-ui/react-dialog'
import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import {
  faBars,
  faXmark,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import {
  DropdownMenuItem,
  DropdownMenuContent,
} from 'components/primitives/Dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAccount, useDisconnect } from 'wagmi'
import { ConnectWalletButton } from 'components/ConnectWalletButton'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { FullscreenModal } from 'components/common/FullscreenModal'
import { useENSResolver, useMarketplaceChain } from 'hooks'

const HamburgerMenu = () => {
  const { address, isConnected } = useAccount()
  const {
    avatar: ensAvatar,
    shortAddress,
    shortName: shortEnsName,
  } = useENSResolver(address)
  const { disconnect } = useDisconnect()
  const { routePrefix } = useMarketplaceChain()

  if (!isConnected) {
    return <ConnectWalletButton />;
  }


  const trigger = (
    <Button
      css={{ justifyContent: 'center', width: '44px', height: '44px' }}
      type="button"
      size="small"
      color="gray3"
    >
      <FontAwesomeIcon icon={faBars} width={16} height={16} />
    </Button>
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          css={{ justifyContent: 'center', width: '44px', height: '44px' }}
          type="button"
          size="small"
          color="gray3"
        >
          <FontAwesomeIcon icon={faBars} width={16} height={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent style={{fontFamily: 'SF Pro Display', padding: '20px 20px 4px 20px', textTransform: 'uppercase', textAlign: 'left'}}>
        <DropdownMenuItem style={{marginTop: '16px'}} asChild>
          <Link href={`/portfolio/${address}`} legacyBehavior>
            <a >My Collection</a>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem style={{padding:'16px 0px'}} onSelect={() => disconnect()}>Disconnect</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HamburgerMenu;
