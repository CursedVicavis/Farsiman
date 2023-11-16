// ** MUI Imports
import Box from '@mui/material/Box'

// ** Third Party Components
import { useKeenSlider } from 'keen-slider/react'

const SwiperDefault = ({ direction }) => {
  // ** Hook
  const [ref] = useKeenSlider({
    rtl: direction === 'rtl'
  })

  return (
    <Box ref={ref} className='keen-slider'>
      <Box className='keen-slider__slide'>
        <img src='/images/banners/Coldplay.jpg' alt='swiper 1' />
      </Box>
      <Box className='keen-slider__slide'>
        <img src='/images/banners/Boda.jpg' alt='swiper 2' />
      </Box>
      <Box className='keen-slider__slide'>
        <img src='/images/banners/fiesta.jpg' alt='swiper 3' />
      </Box>
      <Box className='keen-slider__slide'>
        <img src='/images/banners/fiestas-torremolinos-1200x675.webp' alt='swiper 4' />
      </Box>
      <Box className='keen-slider__slide'>
        <img src='/images/banners/JAs.png' alt='swiper 5' />
      </Box>
    </Box>
  )
}

export default SwiperDefault
