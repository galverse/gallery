import { faCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  extractMediaType,
  TokenMedia,
  useDynamicTokens,
} from '@reservoir0x/reservoir-kit-ui'
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

  const is1155 = token?.token?.kind === 'erc1155'

  return (
    <Box
      css={{
        borderRadius: 8,
        overflow: 'hidden',
        background: '$neutralBgSubtle',
        $$shadowColor: '$colors$panelShadow',
        boxShadow: '0 8px 12px 0px $$shadowColor',
        position: 'relative',
        '&:hover > a > div > img': {
          transform: 'scale(1.1)',
        },
        '@sm': {
          '&:hover .token-button-container': {
            bottom: 0,
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
      )}*/}
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
      </Flex>
      <Link
        passHref
        href={`/${routePrefix}/asset/${token?.token?.contract}:${token?.token?.tokenId}`}
      >
        <Box css={{ position: 'relative', background: '$gray3', overflow: 'hidden', transition: 'all 0.9s ease-in-out' }}>
    {/* Token Image */}
    <TokenMedia
        token={token?.token}
        style={{
            width: '100%',
            maxHeight: 720,
            height: '100%',
            borderRadius: 0,
            aspectRatio: '1/1',
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
        href={`/${routePrefix}/asset/${token?.token?.contract}:${token?.token?.tokenId}`}
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
        backgroundColor: 'rgba(0,0,0,0)',  // Transparent by default
        transition: 'background-color 0.3s ease-in-out',
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.3)'  // Darken on hover
        }
    }}>
        {/* Overlay Text */}
        <Flex
            css={{
                position: 'absolute',
                top: '80%',
                left: '50%',
                flexDirection: 'column',
                gap: '$1',
                color: 'white',
                zIndex: 1,
                transform: 'translate(-50%, -50%)',
                opacity: 0,  // Hidden by default
                transition: 'opacity 0.3s ease-in-out',
                '&:hover': {
                    opacity: 1  // Show on hover
                }
            }}
        >
            <Text
                style="h5"
                as="p"
                css={{
                    fontWeight: 100,
                    fontSize: '28px',
                    maxWidth: '90%',
                    whiteSpace: 'nowrap',
                }}
            >
                {token?.token?.name}
            </Text>
            <Text
                style="subtitle1"
                as="p"
                css={{
                    fontWeight: 600,
                    color: '$gray11',
                    margin: 'auto',
                    maxWidth: '90%',
                    whiteSpace: 'nowrap',
                }}
            >
                {'NO. ' + token?.token?.tokenId}
            </Text>
            {/* Button */}
            
            <Box css={{marginTop: '$2', margin: 'auto'}}>
            <Link
        href={`/${routePrefix}/asset/${token?.token?.contract}:${token?.token?.tokenId}`}
      >
                      <Button
                css={{ justifyContent: 'center', backgroundColor: '#000', width: 'auto', height: 'auto' }}
                type="button"
                size="small"
              >
                VIEW PROFILE
              </Button>
              </Link>
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
            </Flex></Box>
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

              {showSource && token?.market?.floorAsk?.source?.name ? (
                
                <img
                  style={{
                    transform: 'translate(-50%, -50%)',
                    width: 20,
                    height: 20,
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    flexDirection: 'column',
                    gap: '$1',
                    borderRadius: '50%',
                  }}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    const url = `${proxyApi}/redirect/sources/${token?.market?.floorAsk?.source?.domain}/tokens/${token?.token?.contract}:${token?.token?.tokenId}/link/v2`
                    window.open(url, '_blank')
                  }}
                  src={`${proxyApi}/redirect/sources/${token?.market?.floorAsk?.source?.domain}/logo/v2`}
                />
              ) : null}
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
