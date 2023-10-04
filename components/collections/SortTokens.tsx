import { Box, Button } from 'components/primitives'
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
  | 'Price low to high'
  | 'Price high to low'
  | 'Oldest First'
  | 'Newest First'

const options: { [x: string]: { sortBy: string; sortDirection: string } } = {
  'Price low to high': { sortBy: 'floorAskPrice', sortDirection: 'asc' },
  'Price high to low': { sortBy: 'floorAskPrice', sortDirection: 'desc' },
  'Oldest First': { sortBy: 'rarity', sortDirection: 'asc' },
  'Newest First': { sortBy: 'rarity', sortDirection: 'desc' },
}

type Props = {
  css?: CSS
}

export const SortTokens: FC<Props> = ({ css }) => {
  const router = useRouter()
  const [sortSelection, setSortSelection] =
    useState<Options>('Price low to high')

  const isMounted = useMounted()
  const isSmallDevice = useMediaQuery({ maxWidth: 905 }) && isMounted

  useEffect(() => {
    const sortBy = router?.query['sortBy']?.toString()
    const sortDirection = router?.query['sortDirection']?.toString()

    if (sortBy === 'rarity' && sortDirection === 'desc') {
      setSortSelection('Newest First')
      return
    }
    if (sortBy === 'rarity' && sortDirection === 'asc') {
      setSortSelection('Oldest First')
      return
    }
    if (sortBy === 'floorAskPrice' && sortDirection === 'desc') {
      setSortSelection('Price high to low')
      return
    }
    setSortSelection('Price low to high')
  }, [router.query])

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          color="gray3"
          css={{
            fontFamily: 'SFCompactMedium',
            textTransform: 'uppercase',
          }}
        >
          {isSmallDevice ? (
            <FontAwesomeIcon icon={faSort} width={16} height={16} />
          ) : (
            <>
              <span>{sortSelection}</span>
              <Box
                css={{
                  transition: 'transform',
                  '[data-state=open] &': { transform: 'rotate(180deg)' },
                }}
              >
                <FontAwesomeIcon icon={faChevronDown} width={16} />
              </Box>
            </>
          )}
        </Button>
      </DropdownMenu.Trigger>
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
