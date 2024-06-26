import React, { useState, useEffect, useCallback, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Thumb } from './EmblaCarouselThumbsButton'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import type { EmblaOptionsType } from 'embla-carousel'

type PropType = {
  slides: number[]
  mainSlideImages: string[]
  thumbImages: string[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = ({
  slides,
  mainSlideImages,
  thumbImages,
  options
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [backgroundColor, setBackgroundColor] = useState('red')
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
    slidesToScroll: 7
  })

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi, slides.length)

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaApi || !emblaThumbsApi) return
      emblaApi.scrollTo(index)
      setSelectedIndex(index)
    },
    [emblaApi, emblaThumbsApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi || !emblaThumbsApi) return
    const selected = emblaApi.selectedScrollSnap()
    setSelectedIndex(selected)
    emblaThumbsApi.scrollTo(Math.max(0, selected - 1))
  }, [emblaApi, emblaThumbsApi])

  useEffect(() => {
    if (emblaApi && emblaThumbsApi) {
      onSelect()
      emblaApi.on('select', onSelect)
      emblaApi.on('reInit', onSelect)
    }
  }, [emblaApi, emblaThumbsApi, onSelect])

  useEffect(() => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    if (context !== null) {
      const image = new Image()
      image.crossOrigin = 'Anonymous'
      image.src = mainSlideImages[selectedIndex]
      image.onload = () => {
        canvas.width = image.width
        canvas.height = image.height
        context.drawImage(image, 0, 0, image.width, image.height)

        const centerX = Math.floor(image.width / 2)
        const centerY = Math.floor(image.height / 2)
        const pixelData = context.getImageData(centerX, centerY, 1, 1).data

        const averageColor = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`
        setBackgroundColor(averageColor)
      }
    } else {
      console.error('Canvas context is null')
    }
  }, [selectedIndex, mainSlideImages])

  return (
    <div
      style={{
        backgroundColor,
        paddingTop: '100px',
        paddingBottom: '30px',
        paddingInline: '30px'
      }}
    >
      <PrevButton
        onClick={onPrevButtonClick}
        disabled={prevBtnDisabled}
        tabIndex={selectedIndex === 0 ? -1 : 1}
      />
      <section className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {slides.map((index) => (
              <div className="embla__slide" key={index}>
                <img
                  src={mainSlideImages[index]}
                  alt={`Slide ${index}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="embla-thumbs" role="tablist" aria-label="Slides">
          <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
            <div className="embla-thumbs__container">
              {slides.map((index) => (
                <Thumb
                  key={index}
                  onClick={() => onThumbClick(index)}
                  selected={index === selectedIndex}
                  imageUrl={thumbImages[index]}
                  emblaApi={emblaThumbsApi}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '0'
        }}
      >
        <NextButton
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
          tabIndex={selectedIndex === 0 ? 1 : 2}
          style={{ marginLeft: '-74px' }}
        />
      </div>
    </div>
  )
}

export default EmblaCarousel
