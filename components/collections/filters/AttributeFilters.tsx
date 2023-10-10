import { useCollections,
  useCollectionActivity,
  useDynamicTokens, useAttributes } from '@reservoir0x/reservoir-kit-ui'
import { Box, Flex, Switch, CheckBox, Text, Input } from 'components/primitives'
import { FC, useState, useEffect, useMemo, useRef } from 'react'
import SearchIcon from 'public/icons/ux/search.svg'
import { useSearch } from 'context/SearchContextProvider';
import Layout from 'components/Layout'
import Image from 'next/image'
import { AttributeSelector } from './AttributeSelector'
import * as Collapsible from '@radix-ui/react-collapsible'
import { CollapsibleContent } from 'components/primitives/Collapsible'
import { NAVBAR_HEIGHT } from 'components/navbar'
import LoadingSpinner from 'components/common/LoadingSpinner'
import { useDebounce } from 'usehooks-ts'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { paths } from '@reservoir0x/reservoir-sdk'
import { truncateAddress } from 'utils/truncate'
import TokenCard from 'components/collections/TokenCard'
import { FilterButton } from 'components/common/FilterButton'
import SelectedAttributes from 'components/collections/filters/SelectedAttributes'
import { CollectionOffer } from 'components/buttons'
import { Grid } from 'components/primitives/Grid'
import { useIntersectionObserver } from 'usehooks-ts'
import fetcher from 'utils/fetcher'
import { useRouter } from 'next/router'
import { SortTokens } from 'components/collections/SortTokens'
import { useMediaQuery } from 'react-responsive'
import { TabsList, TabsTrigger, TabsContent } from 'components/primitives/Tab'
import * as Tabs from '@radix-ui/react-tabs'
import { CollectionActivityTable } from 'components/collections/CollectionActivityTable'
import { ActivityFilters } from 'components/common/ActivityFilters'
import { MobileAttributeFilters } from 'components/collections/filters/MobileAttributeFilters'
import { MobileActivityFilters } from 'components/common/MobileActivityFilters'
import titleCase from 'utils/titleCase'
import LoadingCard from 'components/common/LoadingCard'
import { useChainCurrency, useMounted } from 'hooks'
import { NORMALIZE_ROYALTIES } from 'pages/_app'
import {
  faCog,
  faCube,
  faGlobe,
  faHand,
  faMagnifyingGlass,
  faSeedling,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import supportedChains, { DefaultChain } from 'utils/chains'
import { Head } from 'components/Head'
import { OpenSeaVerified } from 'components/common/OpenSeaVerified'
import { Address, useAccount } from 'wagmi'
import Img from 'components/primitives/Img'
import Sweep from 'components/buttons/Sweep'
import Mint from 'components/buttons/Mint'
import optimizeImage from 'utils/optimizeImage'
import CopyText from 'components/common/CopyText'
import { CollectionDetails } from 'components/collections/CollectionDetails'
import useTokenUpdateStream from 'hooks/useTokenUpdateStream'
import LiveState from 'components/common/LiveState'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  attributes: ReturnType<typeof useAttributes>['data'] | undefined
  scrollToTop: () => void
}




export const AttributeFilters: FC<Props> = ({
  
  attributes,
  open,
  setOpen,
  scrollToTop,
}) => {
  
const { tokenSearchQuery, setTokenSearchQuery } = useSearch();
const debouncedSearch = useDebounce(tokenSearchQuery, 500)


  return (
    
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      style={{
        transition: 'width .5s',
        width: open ? 420 : 0,
      }}
    >
      {/* Search Bar */}
      <Box
        css={{ backgroundColor: '$neutralBg', position: 'relative', flex: 1, maxWidth: 420, marginBottom: '$3', borderBottom: '1px solid var(--colors-gray7)' }}
      >
        <Box
          css={{
            backgroundColor: '$neutralBg',
            position: 'absolute',
            top: '50%',
            zIndex: 1,
            transform: 'translate(0, -50%)',
            color: '$neutralBg',
          }}
        >
          <Image src={SearchIcon} alt="Search Icon" />
        </Box>
        <Input
          css={{ fontFamily: 'SFCompactMedium', pl: 48, backgroundColor: '$neutralBg', $$focusColor: 'none !important', }}
          placeholder="Find by token ID..."
          onChange={(e) => {
            setTokenSearchQuery(e.target.value);
          }}
          value={tokenSearchQuery}
        />
      </Box>
      <CollapsibleContent
        css={{
          position: 'sticky',
          top: 16 + 80,
          height: `calc(100vh - ${NAVBAR_HEIGHT}px - 32px)`,
          overflow: 'auto',
          marginBottom: 16,
          background: 'transparent',
          border: 'none',
          borderRadius: 0,
        }}
      >
        <Box
          css={{
            '& > div:first-of-type': {
              pt: 0,
            },
          }}
        >
          {attributes &&
            attributes
              .filter((attribute) => attribute.kind != 'number')
              .map((attribute) => (
                <AttributeSelector
                  key={attribute.key}
                  attribute={attribute}
                  scrollToTop={scrollToTop}
                />
              ))}
          {(!attributes || !attributes.length) && (
            <Flex justify="center" align="center" css={{ height: 150 }}>
              <LoadingSpinner css={{ justifySelf: 'center' }} />
            </Flex>
          )}
        </Box>
      </CollapsibleContent>
    </Collapsible.Root>
  )
}
