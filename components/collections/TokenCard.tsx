import { faCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  extractMediaType,
  TokenMedia,
  useDynamicTokens,
} from '@reservoir0x/reservoir-kit-ui'
import { useGrid } from 'context/GridContextProvider';
import AddToCart from 'components/buttons/AddToCart'
import BuyNow from 'components/buttons/BuyNow'
import {
  Box,
  Flex,
  FormatCryptoCurrency,
  Text,
  Tooltip,
  Button,
} from 'components/primitives'
import { ToastContext } from 'context/ToastContextProvider'
import { useMarketplaceChain } from 'hooks'
import Link from 'next/link'
import { SyntheticEvent, useContext } from 'react'
import { MutatorCallback } from 'swr'
import { formatNumber } from 'utils/numbers'
import { Address } from 'wagmi'

type TokenCardProps = {
  token: ReturnType<typeof useDynamicTokens>['data'][0]
  address?: Address
  rarityEnabled: boolean
  addToCartEnabled?: boolean
  showSource?: boolean
  showAsk?: boolean
  mutate?: MutatorCallback
  onMediaPlayed?: (
    e: SyntheticEvent<HTMLAudioElement | HTMLVideoElement, Event>
  ) => void
  tokenCount?: string
}

export default ({
  token,
  address,
  rarityEnabled = true,
  addToCartEnabled = false,
  showAsk = true,
  mutate,
  onMediaPlayed,
  tokenCount,
  showSource = true,
}: TokenCardProps) => {
  const { addToast } = useContext(ToastContext)
  const mediaType = extractMediaType(token?.token)
  const showMedia =
    mediaType === 'mp4' ||
    mediaType === 'mp3' ||
    mediaType === 'm4a' ||
    mediaType === 'wav' ||
    mediaType === 'mov'
  const { routePrefix, proxyApi } = useMarketplaceChain()
  const tokenIsInCart = token && token?.isInCart
  const isOwner = token?.token?.owner?.toLowerCase() !== address?.toLowerCase()

  const getLogoURL = (sourceDomain: string | undefined) => {
    switch (sourceDomain) {
      case 'blur.io':
        return '/home/logos/blur-logo.png';
      case 'opensea.io':
        return '/home/logos/os-logo.png';
      default:
        return `${proxyApi}/redirect/sources/${sourceDomain}/logo/v2`;
    }
  };
  

  const is1155 = token?.token?.kind === 'erc1155'
  const { isDense } = useGrid();


  return (
    
    <Box
      css={{
        borderRadius: 8,
        overflow: 'hidden',
        background: '$neutralBgSubtle',
        $$shadowColor: '$colors$panelShadow',
        position: 'relative',
        transition: 'transform .3s ease-in-out',  // Transition for the scaling effect
        '&:hover': {
          transform: 'scale(1.02)',  // Scale the entire box on hover
          boxShadow: '0px 6px 12px 0px rgba(0, 0, 0, 0.11), 0px 23px 23px 0px rgba(0, 0, 0, 0.09), 0px 51px 31px 0px rgba(0, 0, 0, 0.05), 0px 90px 36px 0px rgba(0, 0, 0, 0.02), 0px 141px 40px 0px rgba(0, 0, 0, 0.00)'
        },
        '@sm': {
          '&:hover .token-button-container': {
            
          },
        },
      }}
    >
      {tokenCount && (
        <Flex
          justify="center"
          align="center"
          css={{
            borderRadius: 8,
            px: '$2',
            py: '$1',
            mr: '$2',
            position: 'absolute',
            left: '$2',
            top: '$2',
            zIndex: 1,
            maxWidth: '50%',
            backgroundColor: 'rgba(	38, 41, 43, 0.3)',
          }}
        >
          <Text
            css={{
              color: '$whiteA12',
            }}
            ellipsify
          >
            x{tokenCount}
          </Text>
        </Flex>
      )}

   {/*   {is1155 && token?.token?.supply && (
        <Flex
          justify="center"
          align="center"
          css={{
            borderRadius: 8,
            px: '$2',
            py: '$1',
            mr: '$2',
            position: 'absolute',
            left: '$2',
            top: '$2',
            zIndex: 1,
            maxWidth: '50%',
            backgroundColor: 'rgba(	38, 41, 43, 0.3)',
            backdropFilter: 'blur(2px)',
          }}
        >
          <Text
            css={{
              color: '$whiteA12',
            }}
            ellipsify
          >
            x{formatNumber(token?.token?.supply, 0, true)}
          </Text>
        </Flex>
      )}
      <Flex
        justify="center"
        align="center"
        css={{
          borderRadius: '99999px',
          width: 48,
          height: 48,
          backgroundColor: '$primary9',
          position: 'absolute',
          right: '$2',
          zIndex: 1,
          transition: `visibility 0s linear ${
            tokenIsInCart ? '' : '250ms'
          }, opacity 250ms ease-in-out, top 250ms ease-in-out`,
          opacity: tokenIsInCart ? 1 : 0,
          top: tokenIsInCart ? '$2' : 50,
          visibility: tokenIsInCart ? 'visible' : 'hidden',
          color: 'white',
        }}
      >
        <FontAwesomeIcon icon={faCheck} width={20} height={20} />
      </Flex>*/}
      <Link
        passHref
        href={`https://www.galverse.art/gal/${token?.token?.tokenId}`}
      >
        <Box 
  css={{ 
    position: 'relative', 
    background: '$gray3', 
    overflow: 'hidden', 
    transition: 'all 0.9s ease-in-out',
    '&:hover > div': { // Target all direct child `div` elements (overlays) when the Box is hovered
      opacity: 1,
      scale: '1.02',
      
    }
  }}
>{/* Token Image */}
  <TokenMedia
        token={token?.token}
        style={{
            width: '100%',
            maxHeight: 720,
            height: '100%',
            transition: 'transform .3s ease-in-out',
            borderRadius: 0,
            aspectRatio: '1/1'
            
        }}
            staticOnly={!showMedia}
            imageResolution={'medium'}
            audioOptions={{
              onPlay: (e) => {
                onMediaPlayed?.(e)
              },
            }}
            videoOptions={{
              onPlay: (e) => {
                onMediaPlayed?.(e)
              },
            }}
            onRefreshToken={() => {
              mutate?.()
              addToast?.({
                title: 'Refresh token',
                description: 'Request to refresh this token was accepted.',
              })
            }}
          />
        </Box>
      </Link>
      <Link
        href={`https://www.galverse.art/gal/${token?.token?.tokenId}`}
      >
        <Flex
          css={{ cursor: 'pointer' }}
          direction="column"
        >
          <Flex align="center" justify="between">
            {/* Dark overlay for hover effect */}
            
            <Box css={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, rgba(36, 36, 36, 0) 0%, #212121 100%)',
        opacity: 0,  // Fully transparent by default
        transition: 'opacity 0.3s ease-in-out',
        '&:hover': {
          opacity: 1,  // Reveal the gradient on hover
          
          boxShadow: '0px 6px 12px 0px rgba(0, 0, 0, 0.11), 0px 23px 23px 0px rgba(0, 0, 0, 0.09), 0px 51px 31px 0px rgba(0, 0, 0, 0.05), 0px 90px 36px 0px rgba(0, 0, 0, 0.02), 0px 141px 40px 0px rgba(0, 0, 0, 0.00)',
          
        }
    }}>
        {/* Overlay Text */}
        <Flex
            css={{
                flexDirection: 'column',
                gap: '$1',
                color: 'white',
                zIndex: 1,
                transform: 'translate(-50%, -50%)',
                opacity: 0,  // Hidden by default
                transition: 'opacity 0.3s ease-in-out',
                scale: '1.02',
                '&:hover': {
                    opacity: 1,  // Show on hover
                }
            }}
        >
                
            {/* Button */}
            <Box css={{marginTop: '$2', margin: 'auto'}}>
            
            </Box>
            
        {/*      {token?.token?.isFlagged && (
                <Tooltip
                  content={
                    <Text style="body3" as="p">
                      Not tradeable on OpenSea
                    </Text>
                  }
                >
                  <Text css={{ color: '$red10' }}>
                    <FontAwesomeIcon
                      icon={faCircleExclamation}
                      width={16}
                      height={16}
                    />
                  </Text>
                </Tooltip>
                )}*/}
            </Flex>

            <Text
                  style="h5"
                  as="p"
                    css={{
                      fontFamily: "BureauGrotCondensedBook",
                      fontWeight: 350,
                      fontSize: isDense ? '22px' : '16px',  // default for small screens
                        '@md': {
                        fontSize: isDense ? '36px' : '24px',  // adjusted for medium screens (>= 900px)
                        },
                        '@lg': {
                        fontSize: isDense ? '42px' : '20px',  // adjusted for large screens (>= 1200px)
                        },
                        '@xl': {
                        fontSize: isDense ? '38px' : '22px',  // adjusted for extra large screens (>= 1820px)
                        },
                        position: 'absolute',
                      top: '74%',
                      width: '100%',
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                      margin: 'auto',
                }}
                >
                {token?.token?.name}
                </Text>
                
            <Text
                style="subtitle1"
                as="p"
                css={{
                    fontFamily: "SourceSans3-Regular",
                    position: 'absolute',
                    top: '84%',
                    left: '5%',
                    width: '100%',
                    textAlign: 'center',
                    fontWeight: 600,
                    letterSpacing: '3%',
                    fontSize: isDense ? '16px' : '10px',  // default for small screens
                        '@md': {
                        fontSize: isDense ? '28px' : '18px',  // adjusted for medium screens (>= 900px)
                        },
                        '@lg': {
                        fontSize: isDense ? '32px' : '20px',  // adjusted for large screens (>= 1200px)
                        },
                        '@xl': {
                        fontSize: isDense ? '28px' : '18px',  // adjusted for extra large screens (>= 1820px)
                        },
                    color: '$gray11',
                    margin: 'auto',
                    maxWidth: '90%',
                    whiteSpace: 'nowrap',
                }}
            >
                {'NO. ' + token?.token?.tokenId}
            </Text>
            
            {showSource && token?.market?.floorAsk?.source?.name ? (
                
                <img
                  style={{
                    width: 26,
                    borderRadius: '20px',
                    marginLeft: '10px',
                    position: 'absolute',
                    top: '7%',
                    border: '2px solid transparent', // Start with a transparent border
                    transition: 'border-color 0.2s ease', // Add a transition for smooth hover effect
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const url = `${proxyApi}/redirect/sources/${token?.market?.floorAsk?.source?.domain}/tokens/${token?.token?.contract}:${token?.token?.tokenId}/link/v2`;
                    window.open(url, '_blank');
                  }}
                  src={getLogoURL(token?.market?.floorAsk?.source?.domain as string | undefined)}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = 'white'; // Change border color to white on hover
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = 'transparent'; // Reset border color on mouse out
                  }}
                />
              ) : null}</Box>
            {/*{rarityEnabled && !is1155 && token?.token?.rarityRank && (
              <Box
                css={{
                  px: '$1',
                  py: 2,
                  background: '$gray3',
                  borderRadius: 8,
                  minWidth: 'max-content',
                }}
              >
                <Flex align="center" css={{ gap: 5 }}>
                  <img
                    style={{ width: 13, height: 13 }}
                    src="/icons/rarity-icon.svg"
                  />
                  <Text style="subtitle3" as="p">
                    {formatNumber(token?.token?.rarityRank)}
                  </Text>
                </Flex>
              </Box>*/}
          </Flex>

        {/*  {showAsk && (
            <Flex align="center" justify="between" css={{ gap: '$2' }}>
              <Flex align="center" css={{ gap: '$2' }}>
                <Box
                  css={{
                    flex: 1,
                    minWidth: 0,
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {token?.market?.floorAsk?.price && (
                    <FormatCryptoCurrency
                      logoHeight={18}
                      amount={token?.market?.floorAsk?.price?.amount?.decimal}
                      address={
                        token?.market?.floorAsk?.price?.currency?.contract
                      }
                      textStyle="h6"
                      css={{
                        textOverflow: 'ellipsis',
                        minWidth: 0,
                        with: '100%',
                        overflow: 'hidden',
                        fontSize: 18,
                      }}
                      maximumFractionDigits={4}
                    />
                  )}
                </Box>

                {is1155 && token?.market?.floorAsk?.quantityRemaining ? (
                  <Text style="subtitle2" ellipsify>
                    x
                    {formatNumber(
                      token?.market?.floorAsk?.quantityRemaining,
                      0,
                      true
                    )}
                  </Text>
                ) : null}
                    </Flex>*/}
                    

              
          {/*{token?.token?.lastSale?.price?.amount?.decimal ? (
            <Flex css={{ gap: '$2', marginTop: 'auto' }}>
              <Text css={{ color: '$gray11' }} style="subtitle3">
                Last Sale
              </Text>
              <FormatCryptoCurrency
                logoHeight={12}
                amount={token.token.lastSale.price.amount?.decimal}
                address={token.token.lastSale.price.currency?.contract}
                decimals={token.token.lastSale.price.currency?.decimals}
                textStyle="subtitle3"
                maximumFractionDigits={4}
              />
            </Flex>
          ) : null}*/}
        </Flex>
      </Link>
    {/*  {showAsk && isOwner && token?.market?.floorAsk?.price?.amount ? (
        <Flex
          className="token-button-container"
          css={{
            width: '100%',
            transition: 'bottom 0.25s ease-in-out',
            position: 'absolute',
            bottom: -44,
            left: 0,
            right: 0,
            gap: 1,
          }}
        >
          
          <BuyNow
            tokenId={token.token?.tokenId}
            collectionId={token.token?.collection?.id}
            mutate={mutate}
            buttonCss={{
              justifyContent: 'center',
              flex: 1,
            }}
            buttonProps={{
              corners: 'square',
            }}
            buttonChildren="Buy Now"
          />
          {addToCartEnabled ? (
            <AddToCart
              token={token}
              buttonCss={{
                width: 52,
                p: 0,
                justifyContent: 'center',
              }}
              buttonProps={{ corners: 'square' }}
            />
          ) : null}
            
        </Flex>
      ) : null}*/}
    </Box>
  )
}
