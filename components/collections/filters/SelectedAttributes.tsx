import { clearAllAttributes, removeParam } from 'utils/router'
import { useRouter } from 'next/router'
import Image from 'next/image'
import smallClose from 'public/icons/ux/small-close.svg'
import { FC, useEffect, useState } from 'react'
import { Button, Flex, Text } from 'components/primitives'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { CollectionOffer } from 'components/buttons'
import { useCollections } from '@reservoir0x/reservoir-kit-ui'

type Attribute = {
  key: string
  value: string
}[]

type Props = {
  collection: ReturnType<typeof useCollections>['data'][0]
  mutate: ReturnType<typeof useCollections>['mutate']
}

const SelectedAttributes: FC<Props> = ({ collection, mutate }) => {
  const router = useRouter()

  const [filters, setFilters] = useState<Attribute>([])

  useEffect(() => {
    let filters = [] as Attribute

    // Extract all queries of attribute type
    // and convert into token format
    Object.keys({ ...router.query }).map((key) => {
      if (
        key.startsWith('attributes[') &&
        key.endsWith(']') &&
        router.query[key] !== ''
      ) {
        if (Array.isArray(router.query[key])) {
          let values = router.query[key] as string[]
          values.forEach((value) => {
            filters.push({ key: key.slice(11, -1), value: value })
          })
        } else {
          filters.push({
            key: key.slice(11, -1),
            value: router.query[key] as string,
          })
        }
      }
    })

    setFilters(filters)
  }, [router.query])

  if (filters.length === 0) return null

  return (
    <Flex wrap="wrap" align="center" css={{ mb: '$4' }}>
      {filters.map(({ key, value }) => (
        <Button
          key={key + value}
          onClick={() => {
            removeParam(router, `attributes[${key}]`, value)
          }}
          color="gray4"
          css={{ mr: '$3' }}
          size="small"
        >
          <Text css={{ color: '$gray11', fontFamily: 'SF Pro Display Bold', fontWeight:'600' }}>
            {key}:
          </Text>
          <Text css={{fontFamily: 'SF Pro Display Bold', fontWeight:'600'}}>{value}</Text>
          <Text css={{ color: '$gray9' }}>
          <Image src={smallClose} alt="Close Button" />
          </Text>
        </Button>
      ))}

      {filters.length > 0 && (
        <Button
          onClick={() => {
            clearAllAttributes(router)
          }}
          color="ghost"
          css={{
            color: '$primary11',
            fontFamily: 'bureauGrotMedium',
            fontWeight: 500,
            textTransform: 'uppercase',
            px: '$4',
          }}
        >
          Clear all
        </Button>
      )}

   {/*   {filters.length === 1 && (
        <CollectionOffer
          collection={collection}
          buttonChildren={
            <>
              Bid on {filters.length} {filters.length > 1 ? 'Traits' : 'Trait'}
            </>
          }
          buttonProps={{
            css: { color: '$primary11', fontWeight: 500, px: '$4' },
            color: 'ghost',
            disabled: false,
          }}
          buttonCss={{ px: '$4' }}
          mutate={mutate}
        />
        )} */}
    </Flex>
  )
}

export default SelectedAttributes
