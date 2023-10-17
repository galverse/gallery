import FilterFunnel from 'public/icons/ux/filter-btn.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { Button } from 'components/primitives'
import { FC } from 'react'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}

export const FilterButton: FC<Props> = ({ open, setOpen }) => {
  return (
    <Button
      css={{ zIndex: '2', justifyContent: 'start',  height: '86px', paddingLeft:'0px' }}
      type="button"
      onClick={() => setOpen(!open)}
      size="small"
      color="ghost"
    >
      <Image
        src={FilterFunnel}
        alt="Filter"
      />
    </Button>
  )
}
