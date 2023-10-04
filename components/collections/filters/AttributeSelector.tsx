import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAttributes } from '@reservoir0x/reservoir-kit-ui'
import { Box, Flex, Switch, CheckBox, Text } from 'components/primitives'
import { useRouter } from 'next/router'
import { CSSProperties, FC, useMemo, useState } from 'react'
import { addParam, hasParam, removeParam } from 'utils/router'
import { FixedSizeList as List } from 'react-window'

type Props = {
  attribute: NonNullable<ReturnType<typeof useAttributes>['data']>[0]
  scrollToTop: () => void
}

export const AttributeSelector: FC<Props> = ({ attribute, scrollToTop }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const sortedAttributes = useMemo(() => {
    return attribute?.values?.sort((a, b) => {
      if (!a.count || !b.count) {
        return 0
      } else {
        return b.count - a.count
      }
    })
  }, [attribute])

  const AttributeRow: FC<{ index: number; style: CSSProperties }> = ({
    index,
    style,
  }) => {
    const currentAttribute = attribute?.values?.[index]

    return (
      <Flex
        key={index}
        style={style}
        css={{ gap: '$3' }}
        align="center"
        onClick={() => {
          if (
            hasParam(
              router,
              `attributes[${attribute.key}]`,
              currentAttribute?.value
            )
          ) {
            removeParam(
              router,
              `attributes[${attribute.key}]`,
              currentAttribute?.value
            )
          } else {
            addParam(
              router,
              `attributes[${attribute.key}]`,
              currentAttribute?.value || ''
            )
          }
        }}
      >
        <CheckBox
            checked={hasParam(
              router,
              `attributes[${attribute.key}]`,
              currentAttribute?.value
            )}
            onCheckedChange={(checked) => {
              if (checked) {
                addParam(
                  router,
                  `attributes[${attribute.key}]`,
                  currentAttribute?.value || ''
                )
              } else {
                removeParam(
                  router,
                  `attributes[${attribute.key}]`,
                  currentAttribute?.value
                )
              }
              scrollToTop()
            }}
          />
        <Text
          style="body1"
          css={{
            flex: 1,
            textTransform: 'uppercase',
            whiteSpace: 'pre',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {currentAttribute?.value}
        </Text>

        <Text style="body3" css={{ color: 'white' }}>
          {currentAttribute?.count}
        </Text>
        <Flex align="start">
          
        </Flex>
      </Flex>
    )
  }

  return (
    <Box
      css={{
        pt: '$3',
        px: '$4',
        borderBottom: '1px solid $gray7',
        cursor: 'pointer',
        '@md': { px: '0' },
      }}
    >
      <Flex
        align="center"
        justify="between"
        css={{ mb: '$3', cursor: 'pointer' }}
        onClick={() => setOpen(!open)}
      >
        <Text as="h5" style="h5" ellipsify>
          {attribute.key}
        </Text>
        <FontAwesomeIcon
          icon={faPlus}
          style={{
            transform: open ? 'rotate(135deg)' : 'rotate(0)',
            transition: '.3s',
          }}
          width={16}
          height={16}
        />
      </Flex>
      <Flex css={{ paddingBottom: open ? 8 : 0 }}>
        <List
          height={
            open
              ? sortedAttributes && sortedAttributes?.length >= 7
                ? 300
                : (sortedAttributes?.length ?? 1) * 36
              : 0
          }
          itemCount={sortedAttributes?.length ?? 1}
          itemSize={36}
          width={'100%'}
          style={{
            overflow: 'auto',
            transition: 'max-height .3s ease-in-out',
          }}
        >
          {AttributeRow}
        </List>
      </Flex>
    </Box>
  )
}
