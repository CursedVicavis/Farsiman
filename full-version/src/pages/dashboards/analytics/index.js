// ** MUI Imports
import Grid from '@mui/material/Grid'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { useEffect } from 'react'
// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import CardSnippet from 'src/@core/components/card-snippet'

// ** Demo Components Imports
import SwiperLoop from 'src/views/components/swiper/SwiperLoop'
import SwiperZoom from 'src/views/components/swiper/SwiperZoom'
import SwiperFader from 'src/views/components/swiper/SwiperFader'
import SwiperDefault from 'src/views/components/swiper/SwiperDefault'
import SwiperSpacing from 'src/views/components/swiper/SwiperSpacing'
import SwiperFreeMode from 'src/views/components/swiper/SwiperFreeMode'
import SwiperCentered from 'src/views/components/swiper/SwiperCentered'
import SwiperVertical from 'src/views/components/swiper/SwiperVertical'
import SwiperControls from 'src/views/components/swiper/SwiperControls'
import SwiperThumbnails from 'src/views/components/swiper/SwiperThumbnails'
import SwiperAutoSwitch from 'src/views/components/swiper/SwiperAutoSwitch'
import SwiperMultipleSlides from 'src/views/components/swiper/SwiperMultipleSlides'
import SwiperMutationObserver from 'src/views/components/swiper/SwiperMutationObserver'
import toast from 'react-hot-toast'
// ** Styled Component Import
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import { useRouter } from 'next/router'
// ** Source code imports
import * as source from 'src/views/components/swiper/SwiperSourceCode'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

const Swiper = () => {
  // ** Hook
  const {
    settings: { direction }
  } = useSettings()
  const router = useRouter()
  useEffect(() => {
    if (localStorage.getItem('registro') == 1) {
      toast.success('¡Bienvenido a TEAM EVENT! \n Disfruta de tu estadia con nosotros', {
        duration: 8000
      })
      localStorage.setItem('registro', 0)
    }
    if (localStorage.getItem('IDUsuario') == null || localStorage.getItem('IDUsuario') == '') {
      

      router.push('/pages/auth/login-v2/')
    }
  
  }, [])

  return (
    <KeenSliderWrapper>
      <Grid container spacing={6} className='match-height'>
        <PageHeader
          title={
            <Typography variant='h5'>
              <MuiLink href='https://www.youtube.com/watch?v=-ZvsGmYKhcU&list=RDvu-Pf-wxqVk&index=5' target='_blank'>
                Algunos de nuestros fantasticos eventos
              </MuiLink>
            </Typography>
          }
        />
        <Grid item xs={12}>
          <Typography>Eventos año 2020</Typography>
          <SwiperDefault direction={direction} />
        </Grid>
        <Grid item xs={12}>
          <Typography>Eventos año 2021</Typography>
          <SwiperLoop direction={direction} />
        </Grid>
        <Grid item xs={12}>
          <Typography>Eventos año 2022</Typography>
          <SwiperFreeMode direction={direction} />
        </Grid>
      </Grid>
    </KeenSliderWrapper>
  )
}

export default Swiper
