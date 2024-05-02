import React from 'react'

type PropType = {
  selected: boolean
  index: number
  onClick: () => void
  imageUrl: string
}

export const Thumb: React.FC<PropType> = ({
  selected,
  index,
  onClick,
  imageUrl
}) => {
  return (
    <div
      className={'embla-thumbs__slide'.concat(
        selected ? ' embla-thumbs__slide--selected' : ''
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__number"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
    </div>
  )
}
