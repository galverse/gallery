import { Anchor, Box, Button, Flex, Text } from 'components/primitives'
import { Avatar } from 'components/primitives/Avatar'
import * as RadixDialog from '@radix-ui/react-dialog'
import {
  faBars,
  faXmark,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'
import Image from 'next/image'
import { useAccount, useDisconnect } from 'wagmi'
import { ConnectWalletButton } from 'components/ConnectWalletButton'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { FullscreenModal } from 'components/common/FullscreenModal'
import { useENSResolver, useMarketplaceChain } from 'hooks'
import ThemeSwitcher from 'components/navbar/ThemeSwitcher'
// import Wallet from 'components/navbar/Wallet'

const HamburgerMenu = () => {
  const { address, isConnected } = useAccount()
  const {
    avatar: ensAvatar,
    shortAddress,
    shortName: shortEnsName,
  } = useENSResolver(address)
  const { disconnect } = useDisconnect()
  const { routePrefix } = useMarketplaceChain()

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
    <FullscreenModal trigger={trigger}>
      {' '}
      <Flex
        css={{
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Flex
          css={{
            py: '$4',
            px: '$4',
            width: '100%',
            borderBottom: '1px solid $gray4',
          }}
          align="center"
          justify="between"
        >
          <Link href="/">
            <Box css={{ width: 200, cursor: 'pointer' }}>
              <Image
                src="/home/logos/brand-logo.svg"
                width={300}
                height={300}
                alt="Galverse"
              />
            </Box>
          </Link>
          <RadixDialog.Close>
            <Flex
              css={{
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                alignItems: 'center',
                borderRadius: 8,
                backgroundColor: '$gray3',
                color: '$gray12',
                '&:hover': {
                  backgroundColor: '$gray4',
                },
              }}
            >
              <FontAwesomeIcon icon={faXmark} width={16} height={16} />
            </Flex>
          </RadixDialog.Close>
        </Flex>
        {isConnected ? (
          <Flex
            css={{
              flexDirection: 'column',
              justifyContent: 'flex-start',
              height: '100%',
              py: '$5',
              px: '$4',
            }}
          >
            <Link href={`/portfolio/${address}`} legacyBehavior>
              <Flex
                css={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  pb: '$4',
                }}
              >
                <Flex css={{ alignItems: 'center' }}>
                  {ensAvatar ? (
                    <Avatar size="medium" src={ensAvatar} />
                  ) : (
                    <Jazzicon
                      diameter={36}
                      seed={jsNumberForAddress(address as string)}
                    />
                  )}
                  <Text style="h3" css={{ ml: '$2' }}>
                    {shortEnsName ? shortEnsName : shortAddress}
                  </Text>
                </Flex>
              </Flex>
            </Link>
            <Link href={"/portfolio?tab=items"} legacyBehavior>
              <Text
                style="subtitle1"
                css={{
                  borderBottom: '1px solid $gray4',
                  cursor: 'pointer',
                  pb: '$4',
                  pt: '24px',
                }}
              >
                My Gals
              </Text>
            </Link>
            
           {/* <Wallet /> */}
            <Flex
              css={{
                justifyContent: 'space-between',
                cursor: 'pointer',
                alignItems: 'center',
                borderBottom: '1px solid $gray4',
              }}
              onClick={() => disconnect()}
            >
              <Text
                style="subtitle1"
                css={{
                  pb: '$4',
                  pt: '24px',
                }}
              >
                Log Out
              </Text>
              <Box css={{ color: '$gray10' }}>
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  width={16}
                  height={16}
                />
              </Box>
            </Flex>
          </Flex>
        ) : (
          <Flex
            direction="column"
            justify="between"
            css={{
              height: '100%',
              pb: '$5',
              px: '$4',
            }}
          >
            <Flex direction="column">
            
            </Flex>
            <Box>
              <ConnectWalletButton />
            </Box>
          </Flex>
        )}
        <Flex
          css={{
            pt: '24px',
            pb: '$5',
            px: '$4',
            gap: '$4',
            width: '100%',
            borderTop: '1px solid $gray4',
          }}
        >
          <a href="https://x.com/galverseNFT" target="_blank">
            <Button
              css={{ justifyContent: 'center', width: '44px', height: '44px' }}
              type="button"
              size="small"
              color="gray3"
            >
              <FontAwesomeIcon icon={faTwitter} width={20} height={20} />
            </Button>
          </a>
          <a href="https://www.instagram.com/galverseNFT/" target="_blank">
            <Button
              css={{ justifyContent: 'center', width: '44px', height: '44px' }}
              type="button"
              size="small"
              color="gray3"
            >
              <FontAwesomeIcon icon={faInstagram} width={20} height={20} />
            </Button>
          </a>
          <a href="https://www.youtube.com/@galverse/" target="_blank">
            <Button
              css={{ justifyContent: 'center', width: '44px', height: '44px' }}
              type="button"
              size="small"
              color="gray3"
            >
              <FontAwesomeIcon icon={faYoutube} width={20} height={20} />
            </Button>
          </a>
          {/*<ThemeSwitcher />*/} 
        </Flex>
      </Flex>
    </FullscreenModal>
  )
}

export default HamburgerMenu
