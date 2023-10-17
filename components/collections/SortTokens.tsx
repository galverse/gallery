import { Box, Button, GridSwitcher } from 'components/primitives'
import { useGrid } from 'context/GridContextProvider';
import Image from 'next/image'
import DropdownIcon from 'public/icons/ux/dropdown.svg'
import MobileSort from 'public/icons/ux/mobile-sort.svg'

import {
  DropdownMenuItem,
  DropdownMenuContent,
} from 'components/primitives/Dropdown'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { faChevronDown, faSort } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMounted } from 'hooks'
import { useMediaQuery } from 'react-responsive'
import { CSS } from '@stitches/react'

type Options =
  | 'Oldest to Newest'
  | 'Newest to Oldest'
  | 'Price low to high'
  | 'Price high to low'

const options: { [x: string]: { sortBy: string; sortDirection: string } } = {
  'Oldest to Newest': { sortBy: 'tokenId', sortDirection: 'asc' },
  'Newest to Oldest': { sortBy: 'tokenId', sortDirection: 'desc' },
  'Price low to high': { sortBy: 'floorAskPrice', sortDirection: 'asc' },
  'Price high to low': { sortBy: 'floorAskPrice', sortDirection: 'desc' },
}

type Props = {
  css?: CSS
}

export const SortTokens: FC<Props> = ({ css }) => {
  const router = useRouter()
  const [sortSelection, setSortSelection] =
    useState<Options>('Oldest to Newest')

  const isMounted = useMounted()
  const isMedDevice = useMediaQuery({ maxWidth: 970 })
  const isSmallDevice = useMediaQuery({ maxWidth: 600 })

  const { isDense, toggleDense } = useGrid();


  useEffect(() => {
    const sortBy = router?.query['sortBy']?.toString();
    const sortDirection = router?.query['sortDirection']?.toString();

    // Check if sorting query parameters are not defined
    if (!sortBy && !sortDirection) {
      router.push({
        query: {
          ...router.query,
          sortBy: options['Oldest to Newest'].sortBy,
          sortDirection: options['Oldest to Newest'].sortDirection,
        },
      });
      return;
    }

    if (sortBy === 'tokenId' && sortDirection === 'desc') {
      setSortSelection('Newest to Oldest');
      return;
    }
    if (sortBy === 'floorAskPrice' && sortDirection === 'asc') {
      setSortSelection('Price low to high');
      return;
    }
    if (sortBy === 'floorAskPrice' && sortDirection === 'desc') {
      setSortSelection('Price high to low');
      return;
    }
    setSortSelection('Oldest to Newest');
  }, [router.query]);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
      <Button
  color="gray3"
  size={isSmallDevice ? 'small' : undefined}
  css={{
    fontFamily: 'SFCompactMedium',
    textTransform: 'uppercase',
    padding: isSmallDevice ? '8px' : undefined,
    position: isSmallDevice ? 'relative' : undefined,
    left: isSmallDevice ? '14px' : undefined
  }}
>
  { !isSmallDevice && <span>{sortSelection}</span> }
  <Box
    css={{
      transition: 'transform',
      '[data-state=open] &': { transform: 'rotate(180deg)' },
    }}
  >
    {isSmallDevice ? (
      <Image src={MobileSort} alt="Dropdown Icon" width={30} />
    ) : (
      <Image src={DropdownIcon} alt="Dropdown Icon" width={30} />
    )}
  </Box>
</Button>

      </DropdownMenu.Trigger>
      <Box css={{ marginLeft: '16px', backgroundColor: '$gray3', borderRadius: '8px' }}>  {/* Adjust spacing as needed */}
  <GridSwitcher checked={isDense} onChange={toggleDense} />
</Box>
      <DropdownMenuContent css={{ width: '220px', mt: '$2', zIndex: 1000, fontFamily: 'SFCompactMedium', textTransform: 'uppercase', }}>
        {Object.keys(options).map((key) => (
          <DropdownMenuItem
            key={key}
            css={{ py: '$3' }}
            onClick={() => {
              router.push(
                {
                  query: {
                    ...router.query,
                    ['sortBy']: options[key].sortBy,
                    ['sortDirection']: options[key].sortDirection,
                  },
                },
                undefined,
                {
                  shallow: true,
                }
              )
            }}
            aria-label={`Sort by ${key}`}
          >
            {key}
          </DropdownMenuItem>
        ))}
        
      </DropdownMenuContent>
    </DropdownMenu.Root>
    
  )
}
