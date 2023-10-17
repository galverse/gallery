import {
  faCheck,
  faEdit,
  faEllipsis,
  faGasPump,
  faHand,
  faPlus,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  EditListingModal,
  EditListingStep,
  extractMediaType,
  TokenMedia,
  useDynamicTokens,
  useTokens,
  useUserTokens,
} from '@reservoir0x/reservoir-kit-ui'
import { AcceptBid } from 'components/buttons'
import BuyNow from 'components/buttons/BuyNow'
import CancelListing from 'components/buttons/CancelListing'
import List from 'components/buttons/List'
import { spin } from 'components/common/LoadingSpinner'
import {
  Box,
  Button,
  Flex,
  FormatCryptoCurrency,
  Text,
  Tooltip,
} from 'components/primitives'
import { Dropdown, DropdownMenuItem } from 'components/primitives/Dropdown'
import { ToastContext } from 'context/ToastContextProvider'
import { useMarketplaceChain } from 'hooks'
import Link from 'next/link'
import { UserToken } from 'pages/portfolio/[[...address]]'
import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useContext,
  useMemo,
  useState,
} from 'react'
import { MutatorCallback } from 'swr'
import { useMediaQuery } from 'react-responsive'
import fetcher from 'utils/fetcher'
import { formatNumber } from 'utils/numbers'
import { DATE_REGEX, timeTill } from 'utils/till'
import { Address } from 'wagmi'
import Image from 'next/image'
import optimizeImage from 'utils/optimizeImage'

type PortfolioTokenCardProps = {
  token: ReturnType<typeof useUserTokens>['data'][0]
  address: Address
  isOwner: boolean
  rarityEnabled: boolean
  tokenCount?: string
  orderQuantity?: number
  selectedItems: UserToken[]
  setSelectedItems: Dispatch<SetStateAction<UserToken[]>>
  mutate?: MutatorCallback
  onMediaPlayed?: (
    e: SyntheticEvent<HTMLAudioElement | HTMLVideoElement, Event>
  ) => void
}

export default ({
  token,
  address,
  isOwner,
  rarityEnabled = true,
  orderQuantity,
  tokenCount,
  selectedItems,
  setSelectedItems,
  mutate,
  onMediaPlayed,
}: PortfolioTokenCardProps) => {
  const { addToast } = useContext(ToastContext)
  const [isRefreshing, setIsRefreshing] = useState(false)

  let dynamicToken = token as ReturnType<typeof useDynamicTokens>['data'][0]

  const isSmallDevice = useMediaQuery({ maxWidth: 900 })

  const mediaType = extractMediaType(dynamicToken?.token)
  const showPreview =
    mediaType === 'other' || mediaType === 'html' || mediaType === null
  const { routePrefix, proxyApi } = useMarketplaceChain()

  const collectionImage = useMemo(() => {
    return optimizeImage(token?.token?.collection?.imageUrl, 500)
  }, [token?.token?.collection?.imageUrl])

  const isOracleOrder =
    token?.ownership?.floorAsk?.rawData?.isNativeOffChainCancellable

  const contract = token.token?.collection?.id
    ? token.token?.collection.id?.split(':')[0]
    : undefined

  const addSelectedItem = (item: UserToken) => {
    setSelectedItems([...selectedItems, item])
  }

  const removeSelectedItem = (item: UserToken) => {
    setSelectedItems(
      selectedItems.filter(
        (selectedItem) =>
          selectedItem?.token?.tokenId !== item?.token?.tokenId ||
          selectedItem?.token?.contract !== item?.token?.contract
      )
    )
  }

  const isSelectedItem = useMemo(() => {
    return selectedItems.some(
      (selectedItem) =>
        selectedItem?.token?.tokenId === token?.token?.tokenId &&
        selectedItem?.token?.contract === token?.token?.contract
    )
  }, [selectedItems])

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
            display:'none',
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
            x{formatNumber(tokenCount, 0, true)}
          </Text>
        </Flex>
      )}
      
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
>
          <TokenMedia
            token={dynamicToken?.token}
            style={{
              width: '100%',
              maxHeight: 720,
              height: '100%',
              transition: 'transform .3s ease-in-out',
              borderRadius: 0,
              aspectRatio: '1/1',
          }}
              staticOnly={showPreview}
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
        ><Box css={{marginTop: '$2', margin: 'auto'}}>
            
        </Box>
        </Flex>

<Text
      style="h5"
      as="p"
        css={{
          fontFamily: "BureauGrotCondensedBook",
          fontWeight: 350,
          fontSize: '16px',  // default for small screens
            '@md': {
            fontSize:'24px',  // adjusted for medium screens (>= 900px)
            },
            '@lg': {
            fontSize:'20px',  // adjusted for large screens (>= 1200px)
            },
            '@xl': {
            fontSize: '22px',  // adjusted for extra large screens (>= 1820px)
            },
            position: 'absolute',
          top: '72%',
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
        top: '82%',
        left: '5%',
        width: '100%',
        textAlign: 'center',
        fontWeight: 600,
        letterSpacing: '3%',
        fontSize: '10px',  // default for small screens
            '@md': {
            fontSize: '18px',  // adjusted for medium screens (>= 900px)
            },
            '@lg': {
            fontSize: '20px',  // adjusted for large screens (>= 1200px)
            },
            '@xl': {
            fontSize: '18px',  // adjusted for extra large screens (>= 1820px)
            },
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
        href={`https://www.galverse.art/gal/${token?.token?.tokenId}`}
      >
                      
              </Link>
            </Box>
            {/*
            {rarityEnabled &&
            token?.token?.kind !== 'erc1155' &&
            token?.token?.rarityRank ? (
              <Box
                css={{
                  px: '$1',
                  py: 2,
                  background: '$gray5',
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
              </Box>
            ) : null}
          </Flex>

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
              {token?.ownership?.floorAsk?.price && (
                <FormatCryptoCurrency
                  logoHeight={18}
                  amount={token?.ownership?.floorAsk?.price?.amount?.decimal}
                  address={
                    token?.ownership?.floorAsk?.price?.currency?.contract
                  }
                  textStyle="h6"
                  css={{
                    textOverflow: 'ellipsis',
                    minWidth: 0,
                    with: '100%',
                    overflow: 'hidden',
                  }}
                  maximumFractionDigits={4}
                />
              )}
            </Box>
                */}
            <>
              {token?.ownership?.floorAsk?.source?.name && (
                <img
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                  }}
                  src={`${proxyApi}/redirect/sources/${token?.ownership?.floorAsk?.source?.domain}/logo/v2`}
                />
              )}
            </></Box>
          </Flex>
          {token?.token?.lastSale?.price?.amount?.decimal ? (
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
          ) : null}
        </Flex>
      </Link>
      
      {isOwner ? (
        <Flex
          className="token-button-container"
          css={{
            display:'none',
            width: '100%',
            transition: 'bottom 0.25s ease-in-out',
            position: 'absolute',
            bottom: -44,
            left: 0,
            right: 0,
            gap: 1,
          }}
        >
          <List
            token={token as ReturnType<typeof useTokens>['data'][0]}
            buttonCss={{
              justifyContent: 'center',
              flex: 1,
            }}
            buttonProps={{
              corners: 'square',
            }}
            buttonChildren="List"
            mutate={mutate}
          />
          <Dropdown
            modal={false}
            trigger={
              <Button
                corners="square"
                size="xs"
                css={{ width: 44, justifyContent: 'center' }}
              >
                <FontAwesomeIcon icon={faEllipsis} />
              </Button>
            }
            contentProps={{
              asChild: true,
              forceMount: true,
              align: 'start',
              alignOffset: -18,
            }}
          >
            {/*
            {token?.token?.topBid?.price?.amount?.decimal && isOwner && (
              <AcceptBid
                tokenId={token.token.tokenId}
                collectionId={token?.token?.contract}
                mutate={mutate}
                buttonCss={{
                  gap: '$2',
                  px: '$2',
                  py: '$3',
                  borderRadius: 8,
                  outline: 'none',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '$gray5',
                  },
                  '&:focus': {
                    backgroundColor: '$gray5',
                  },
                }}
                buttonChildren={
                  <>
                    <Box css={{ color: '$gray10' }}>
                      <FontAwesomeIcon icon={faHand} />
                    </Box>
                    <Text>Accept Best Offer</Text>
                  </>
                }
              />
            )}*/}
            <DropdownMenuItem
              css={{ py: '$3', width: '100%' }}
              onClick={(e) => {
                if (isRefreshing) {
                  e.preventDefault()
                  return
                }
                setIsRefreshing(true)
                fetcher(
                  `${window.location.origin}/${proxyApi}/tokens/refresh/v1`,
                  undefined,
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      token: `${contract}:${token.token?.tokenId}`,
                    }),
                  }
                )
                  .then(({ data, response }) => {
                    if (response.status === 200) {
                      addToast?.({
                        title: 'Refresh token',
                        description:
                          'Request to refresh this token was accepted.',
                      })
                    } else {
                      throw data
                    }
                    setIsRefreshing(false)
                  })
                  .catch((e) => {
                    const ratelimit = DATE_REGEX.exec(e?.message)?.[0]

                    addToast?.({
                      title: 'Refresh token failed',
                      description: ratelimit
                        ? `This token was recently refreshed. The next available refresh is ${timeTill(
                            ratelimit
                          )}.`
                        : `This token was recently refreshed. Please try again later.`,
                    })

                    setIsRefreshing(false)
                    throw e
                  })
              }}
            >
              <Flex align="center" css={{ gap: '$2' }}>
                <Box
                  css={{
                    color: '$gray10',
                    animation: isRefreshing
                      ? `${spin} 1s cubic-bezier(0.76, 0.35, 0.2, 0.7) infinite`
                      : 'none',
                  }}
                >
                  <FontAwesomeIcon icon={faRefresh} width={16} height={16} />
                </Box>
                <Text>Refresh Token</Text>
              </Flex>
            </DropdownMenuItem>

{/*
            {isOracleOrder &&
            token?.ownership?.floorAsk?.id &&
            token?.token?.tokenId &&
            token?.token?.collection?.id ? (
              <EditListingModal
                trigger={
                  <Flex
                    align="center"
                    css={{
                      gap: '$2',
                      px: '$2',
                      py: '$3',
                      borderRadius: 8,
                      outline: 'none',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: '$gray5',
                      },
                      '&:focus': {
                        backgroundColor: '$gray5',
                      },
                    }}
                  >
                    <Box css={{ color: '$gray10' }}>
                      <FontAwesomeIcon icon={faEdit} />
                    </Box>
                    <Text>Edit Listing</Text>
                  </Flex>
                }
                listingId={token?.ownership?.floorAsk?.id}
                tokenId={token?.token?.tokenId}
                collectionId={token?.token?.collection?.id}
                onClose={(data, currentStep) => {
                  if (mutate && currentStep == EditListingStep.Complete)
                    mutate()
                }}
              />
            ) : null}

            {token?.ownership?.floorAsk?.id ? (
              <CancelListing
                listingId={token.ownership.floorAsk.id as string}
                mutate={mutate}
                trigger={
                  <Flex
                    css={{
                      px: '$2',
                      py: '$3',
                      borderRadius: 8,
                      outline: 'none',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: '$gray5',
                      },
                      '&:focus': {
                        backgroundColor: '$gray5',
                      },
                    }}
                  >
                    {!isOracleOrder ? (
                      <Tooltip
                        content={
                          <Text style="body2" as="p">
                            Canceling this order requires gas.
                          </Text>
                        }
                      >
                        <Flex align="center" css={{ gap: '$2' }}>
                          <Box css={{ color: '$gray10' }}>
                            <FontAwesomeIcon icon={faGasPump} />
                          </Box>
                          <Text color="error">Cancel Listing</Text>
                        </Flex>
                      </Tooltip>
                    ) : (
                      <Text color="error">Cancel</Text>
                    )}
                  </Flex>
                }
              />
            ) : null}*/}
          </Dropdown>
        </Flex>
      ) : null}
    </Box>
  )
}
