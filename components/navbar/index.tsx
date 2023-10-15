// import GlobalSearch from './GlobalSearch'
// import MobileSearch from './MobileSearch'
// import CartButton from './CartButton'
import { useRef } from 'react'
import { Box, Flex, Card } from '../primitives'
import backNav from 'public/icons/ux/back-nav.svg'
import { useRouter } from 'next/router'
import { useHotkeys } from 'react-hotkeys-hook'
import GalverseLogo from 'public/home/logos/brand-logo.svg'
import Link from 'next/link'
import Image from 'next/image'
import { ConnectWalletButton } from 'components/ConnectWalletButton'
import NavItem from './NavItem'
import ThemeSwitcher from './ThemeSwitcher'
import HamburgerMenu from './HamburgerMenu'
import { useTheme } from 'next-themes'
import { useMediaQuery } from 'react-responsive'
import { useMarketplaceChain, useMounted } from '../../hooks'
import { useAccount } from 'wagmi'

import { AccountSidebar } from 'components/navbar/AccountSidebar'

import * as HoverCard from '@radix-ui/react-hover-card'

export const NAVBAR_HEIGHT = 81
export const NAVBAR_HEIGHT_MOBILE = 77

const Navbar = () => {
  const { theme } = useTheme()
  const { isConnected } = useAccount()
  const isMobile = useMediaQuery({ query: '(max-width: 960px' })
  const isMounted = useMounted()
  const { routePrefix } = useMarketplaceChain()

//  let searchRef = useRef<HTMLInputElement>(null)

  const router = useRouter()
  useHotkeys('meta+k', (e) => {
    e.preventDefault()
 {/*   if (searchRef?.current) {
      searchRef?.current?.focus()
       } 
*/}
  })

  if (!isMounted) {
    return null
  }

  return isMobile ? (
    <Flex
      css={{
        height: NAVBAR_HEIGHT_MOBILE,
        px: '$4',
        width: '100%',
        borderBottom: '1px solid $gray4',
        zIndex: 999,
        background: '$slate1',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
      }}
      align="center"
      justify="between"
    >
      <Box css={{ flex: 1 }}>
        <Flex align="center">
        <Link href={"https://www.galverse.art/"}>
              <Image
                src={backNav}
                width={30}
                height={42}
                alt="Back Navigation"
                style={{ marginRight: '30px' }}
              />
          </Link>
          <Link href={`/${routePrefix}`}>
            <Box css={{ width: 200, cursor: 'pointer' }}>
              <Image
                src={GalverseLogo}
                width={150}
                height={150}
                alt="Galverse"
              />
            </Box>
          </Link>
        </Flex>
      </Box>
      <Flex align="center" css={{ gap: '$3' }}>
        {/*<MobileSearch key={`${router.asPath}-search`} />
        <CartButton />*/}
        <HamburgerMenu key={`${router.asPath}-hamburger`} />
      </Flex>
    </Flex>
  ) : (
    <Flex
      css={{
        height: NAVBAR_HEIGHT,
        px: '$6',
        
        '@xl': {
          px: '$6',
        },
        width: '100%',
        // maxWidth: 1920,
        mx: 'auto',
        borderBottom: '1px solid $gray4',
        zIndex: 999,
        background: '$neutralBg',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
      }}
      align="center"
      justify="between"
    >
      <Box
        css={{
          flex: 'unset',
          '@bp1300': {
            flex: 1,
          },
        }}
      >
        <Flex align="center">
        <Link href={"https://www.galverse.art/"}>
              <Image
                src={backNav}
                width={35}
                height={35}
                alt="Back Navigation"
                style={{ marginRight: '10px', position: 'relative', right: '20px' }}
              />
          </Link>
          <Link href={`/${routePrefix}`}>
            <Box css={{ cursor: 'pointer', alignItems: 'flex-start' }}>
              <Image
                src={GalverseLogo}
                width={200}
                height={200}
                alt="Galverse"
              />
            </Box>
          </Link>
          <Flex
            align="center"
            css={{
              gap: '$5',
              ml: '$5',
            }}
          >

            {/* <HoverCard.Root openDelay={200}>
              <HoverCard.Trigger>
                <Link href={`/${routePrefix}/collection-rankings`}>
                  <NavItem
                    active={router.pathname.includes('collection-rankings')}
                  >
                    NFTs
                  </NavItem>
                </Link>
              </HoverCard.Trigger>
              <HoverCard.Content sideOffset={24} align="start">
                <Card css={{ p: 24, width: 240 }}>
                  <Flex css={{ gap: '$4' }} direction="column">
                    <Link href={`/${routePrefix}/collection-rankings`}>
                      <NavItem
                        active={router.pathname.includes('collection-rankings')}
                      >
                        Trending Collections
                      </NavItem>
                    </Link>
                    <Link href={`/${routePrefix}/collection-rankings`}>
                      <NavItem
                        active={router.pathname.includes('collection-rankings')}
                      >
                        Trending Mints
                      </NavItem>
                    </Link>
                  </Flex>
                </Card>
              </HoverCard.Content>
            </HoverCard.Root> */}

            {false && (
              <Link href={`/${routePrefix}/collections/minting`}>
                <NavItem>Mints</NavItem>
              </Link>
            )}
            {false && (
              <Link href="/swap">
                <NavItem>Tokens</NavItem>
              </Link>
            )}
          </Flex>
        </Flex>
      </Box>
      <Box css={{ flex: 1, px: '$5' }}>
       {/* <GlobalSearch
          ref={searchRef}
          placeholder="Search collections and addresses"
          containerCss={{ width: '100%' }}
          key={router.asPath}
        />*/}
      </Box>

      <Flex
        css={{
          gap: '$3',
          flex: 'unset',
          '@bp1300': {
            flex: 1,
          },
        }}
        justify="end"
        align="center"
      >
        <Flex css={{ gap: '$5', mr: 12 }}>
          {/*
        <a target="_blank" href={`https://www.galverse.art`}>
              <Box css={{ mr: '$2' }}>
                <NavItem>Home</NavItem>
              </Box>
            </a>
            <Link href={`/ethereum/collection/0x582048c4077a34e7c3799962f1f8c5342a3f4b12`}>
            <NavItem>Gallery</NavItem>
          </Link>
          <Box>
            <HoverCard.Root openDelay={120}>
              <HoverCard.Trigger>
                <a target="_blank" href={`https://www.galverse.art/`}>
                  <NavItem>Home</NavItem>
                </a>
              </HoverCard.Trigger>
              <HoverCard.Content sideOffset={24} align="start">
                <Card css={{ p: 24, width: 240 }}>
                  <Flex css={{ gap: '$4' }} direction="column">
                    <a target="_blank" href={`https://reservoir.tools`}>
                      <NavItem>About Reservoir</NavItem>
                    </a>
                    <a
                      target="_blank"
                      href={`https://docs.reservoir.tools/docs`}
                    >
                      <NavItem>Docs</NavItem>
                    </a>

                    <a
                      target="_blank"
                      href={`https://docs.reservoir.tools/reference/overview`}
                    >
                      <NavItem>API Reference</NavItem>
                    </a>

                    <a
                      target="_blank"
                      href={`https://github.com/reservoirprotocol`}
                    >
                      <NavItem>Github</NavItem>
                    </a>

                    <a href={`https://testnets.reservoir.tools`}>
                      <NavItem>Testnet Explorer</NavItem>
                    </a>
                  </Flex>
                </Card>
              </HoverCard.Content>
            </HoverCard.Root>
          </Box>*/}

          </Flex>

        {isConnected ? (
          <AccountSidebar />
        ) : (
          <Box css={{ maxWidth: '285px' }}>
            <ConnectWalletButton />
          </Box>
        )}
        {/*<CartButton /> */}
      </Flex>
    </Flex>
  )
}

export default Navbar
