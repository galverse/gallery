import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAttributes } from '@reservoir0x/reservoir-kit-ui'

import Layout from 'components/Layout'
import Image from 'next/image'
import { Box, Flex, Switch, CheckBox, Text, Input } from 'components/primitives'
import { useRouter } from 'next/router'
import { CSSProperties, FC, useMemo, useState } from 'react'
import { addParam, hasParam, removeParam } from 'utils/router'
import { FixedSizeList as List } from 'react-window'
import ScrollableArea from 'components/common/ScrollStyle';
import { useDebounce } from 'usehooks-ts'

type Props = {
  attribute: NonNullable<ReturnType<typeof useAttributes>['data']>[0]
  scrollToTop: () => void
}

export const AttributeSelector: FC<Props> = ({ attribute, scrollToTop }) => {
  
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [tokenSearchQuery, setTokenSearchQuery] = useState<string>('')
  const debouncedSearch = useDebounce(tokenSearchQuery, 500)
console.log("Raw attribute key:", attribute.key);

  const attributeIcons: Record<string, string> = {
    trait_6551_Upgrade: '/icons/traits/6551_Upgrade.svg',
    trait_Back_Item: '/icons/traits/Back_Item.svg',
    trait_Background: '/icons/traits/Background.svg',
    trait_Body_Art: '/icons/traits/Body_Art.svg',
    trait_Character: '/icons/traits/Character.svg',
    trait_Clothes: '/icons/traits/Clothes.svg',
    trait_Earrings: '/icons/traits/Earrings.svg',
    trait_Ears: '/icons/traits/Ears.svg',
    trait_Energy_Source: '/icons/traits/Energy_Source.svg',
    trait_Eyebrows: '/icons/traits/Eyebrows.svg',
    trait_Eyes: '/icons/traits/Eyes.svg',
    trait_Eyewear: '/icons/traits/Eyewear.svg',
    trait_Special: '/icons/traits/FX.svg',
    trait_Gal_Coordinates: '/icons/traits/Gal_Coordinates.svg',
    trait_Hair_Back: '/icons/traits/Hair_(Back).svg',
    trait_Hair_Front: '/icons/traits/Hair_(Front).svg',
    trait_Hair_Item: '/icons/traits/Hair_Item.svg',
    trait_Hair_Middle: '/icons/traits/Hair_(Middle).svg',
    trait_Head_Item: '/icons/traits/Head_Item.svg',
    trait_Headwear: '/icons/traits/Headwear.svg',
    trait_Mouth: '/icons/traits/Mouth.svg',
    trait_Skin_Tone: '/icons/traits/Skin_Tone.svg',
    trait_Star_Affinity: '/icons/traits/Star_Affinity.svg',
    trait_Time: '/icons/traits/Time.svg',
    trait_VTuber_Upgrade: '/icons/traits/vtuber_upgrade.svg'
  };

  function attributeNameToFilename(attributeName: string): string {
    return 'trait_' + attributeName.replace(/ /g, '_').replace(/\(/g, '').replace(/\)/g, '');
}
console.log('Attribute key:', attribute.key);
console.log('Transformed Attribute key:', attributeNameToFilename(attribute.key));
console.log('Icon Source:', attributeIcons[attributeNameToFilename(attribute.key)]);

const transformedKey = attributeNameToFilename(attribute.key);

  const sortedAttributes = useMemo(() => {
    return attribute?.values?.sort((a, b) => {
      if (!a.count || !b.count) {
        return 0
      } else {
        return b.count - a.count
      }
    })
  }, [attribute])

  const AttributeRow: FC<{ index: number; style: CSSProperties }> = ({ index, style }) => {
    console.log("Rendering AttributeRow");
    
    const currentAttribute = attribute?.values?.[index];
    if (!attribute || !attribute.values) {
      console.error("Attribute or its values is undefined!");
      return null; // This will prevent rendering the row if there's an error.
  }
    console.log("Current Attribute:", currentAttribute?.value);
    const iconFilename = attributeNameToFilename(attribute.key);
    const iconSrc = attributeIcons[iconFilename];
    console.log(iconSrc);
    if (iconFilename === 'trait_6551_Upgrade') {
      return null;  // Return null if it's 'trait_6551_Upgrade'
    }

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
          css={{
            flex: 1,
            textTransform: 'uppercase',
            fontWeight: '600',
            whiteSpace: 'pre',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            fontFamily: 'SF Pro Display'
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
  console.log("Rendering icon with path:", attributeIcons[attribute.key]);
  console.log("Raw attribute key:", attribute.key);
  if (transformedKey !== 'trait_6551_Upgrade') {
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
      {/* Attributes Toggle */}
      
      <Flex
        align="center"
        justify="between"
        css={{ mb: '$3', cursor: 'pointer' }}
        onClick={() => setOpen(!open)}
      >
        
        <Flex align="center" css={{ gap: '$3' }}>
        
        <Image src={attributeIcons[transformedKey]} alt={`${attribute.key} icon`} width={32} height={32} />
          <Text style="attributes" ellipsify>
            {attribute.key}
          </Text>
</Flex>
        <FontAwesomeIcon
            icon={open ? faMinus : faPlus}
            width={16}
            height={16}
          />
      </Flex>

      {/* Attributes List */}
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
  );
}
return null;  // Return null if it's 'trait_6551_Upgrade'
}