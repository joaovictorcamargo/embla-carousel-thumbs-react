import React, { useState, useEffect, useCallback } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { Thumb } from './EmblaCarouselThumbsButton'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import img1 from '../images/Property1.png'
import img2 from '../images/collage.png'
import img3 from '../images/collage2.png'

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = ({ slides, options }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
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
  } = usePrevNextButtons(emblaMainApi, slides.length)

  const imageUrls = [img1, img3, img2, img1, img1, img1, img1, img1]

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
      setSelectedIndex(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    const selected = emblaMainApi.selectedScrollSnap()
    setSelectedIndex(selected)
    emblaThumbsApi.scrollTo(Math.max(0, selected - 1))
  }, [emblaMainApi, emblaThumbsApi])

  useEffect(() => {
    if (emblaMainApi && emblaThumbsApi) {
      onSelect()
      emblaMainApi.on('select', onSelect)
      emblaMainApi.on('reInit', onSelect)
    }
  }, [emblaMainApi, emblaThumbsApi, onSelect])

  return (
    <section className="embla">
      <PrevButton
        onClick={onPrevButtonClick}
        disabled={prevBtnDisabled}
        tabIndex={selectedIndex === 0 ? -1 : 1}
      />
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <img
                src={imageUrls[index]}
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
                imageUrl={imageUrls[index]}
              />
            ))}
          </div>
        </div>
      </div>
      <NextButton
        onClick={onNextButtonClick}
        disabled={nextBtnDisabled}
        tabIndex={selectedIndex === 0 ? 1 : 2}
      />
    </section>
  )
}

export default EmblaCarousel
