// ** MUI Imports
import Box from '@mui/material/Box'

// ** Third Party Components
import { useKeenSlider } from 'keen-slider/react'

const SwiperLoop = ({ direction }) => {
  // ** Hook
  const [ref] = useKeenSlider({
    loop: true,
    rtl: direction === 'rtl'
  })

  return (
    <Box ref={ref} className='keen-slider'>
      <Box className='keen-slider__slide'>
        <img src='/images/banners/boda2.jpg' alt='swiper 7' />
      </Box>
      <Box className='keen-slider__slide'>
        <img src='/images/banners/coa.jpg' alt='swiper 8' />
      </Box>
      <Box className='keen-slider__slide'>
        <img src='/images/banners/Tomorrowland.webp' alt='swiper 9' />
      </Box>
      <Box className='keen-slider__slide'>
        <img src='/images/banners/LCB2SVXI5VG6LBAUX6YSYOT5ZQ.avif' alt='swiper 10' />
      </Box>
    </Box>
  )
}

export default SwiperLoop
