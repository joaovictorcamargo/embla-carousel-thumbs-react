import React from 'react'
import ReactDOM from 'react-dom/client'
import EmblaCarousel from './js/EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'
import './css/base.css'
import './css/sandbox.css'
import './css/embla.css'
import img1 from '../src/images/Property1.png'
import img2 from '../src/images/collage.png'
import img3 from '../src/images/collage2.png'
import img4 from '../src/images/image.png'
import img5 from '../src/images/image2.png'
import img6 from '../src/images/image3.png'
import img7 from '../src/images/image4.png'
import img8 from '../src/images/image5.png'
import img9 from '../src/images/image6.png'

const OPTIONS: EmblaOptionsType = {}
const SLIDE_COUNT = 8
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const mainSlideImages = [img1, img3, img2, img1, img1, img1, img1, img1]
const thumbImages = [img4, img5, img6, img7, img8, img9, img9, img9, img9]

const App: React.FC = () => (
  <>
    <EmblaCarousel
      thumbImages={thumbImages}
      mainSlideImages={mainSlideImages}
      slides={SLIDES}
      options={OPTIONS}
    />
  </>
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
