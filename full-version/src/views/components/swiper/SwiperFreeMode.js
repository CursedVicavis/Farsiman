// ** MUI Imports
import Box from '@mui/material/Box'

// ** Third Party Components
import { useKeenSlider } from 'keen-slider/react'

const SwiperFreeMode = ({ direction }) => {
  // ** Hook
  const [ref] = useKeenSlider({
    loop: true,
    mode: 'free',
    rtl: direction === 'rtl',
    slides: {
      perView: 2,
      spacing: 16
    }
  })

  return (
    <Box ref={ref} className='keen-slider'>
      <Box className='keen-slider__slide'>
        <img src='/images/banners/boda3.jpg' alt='swiper 21' />
      </Box>
      <Box className='keen-slider__slide'>
        <img src='/images/banners/D_NQ_NP_883053-MLC51536474787_092022-O.jpg' alt='swiper 22' />
      </Box>
      <Box className='keen-slider__slide'>
        <img src='/images/banners/asdasdfgdfg.jpg' alt='swiper 23' />
      </Box>
      <Box className='keen-slider__slide'>
        <img src='/images/banners/avatars-000075281794-2sd7ij-t500x500.jpg' alt='swiper 24' />
      </Box>
      <Box className='keen-slider__slide'>
        <img src='/images/banners/das.jpg' alt='swiper 25' />
      </Box>
    </Box>
  )
}

export default SwiperFreeMode
