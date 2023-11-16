// ** React Imports
import { useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

// ** Hook Imports
import { useAuth } from 'src/hooks/useAuth'
import axios from 'axios'

/**
 *  Set Home URL based on User Roles
 */
export const getHomeRoute = role => {
  if (role === 'client') return '/acl'
  else return 'http://localhost:3000/pages/auth/login-v2/'
}

const Home = () => {
  // ** Hooks
  const auth = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (auth.user && auth.user.role) {
      const homeRoute = getHomeRoute(auth.user.role)

      // Redirect user to Home URL
      router.replace(homeRoute)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  axios.defaults.baseURL = process.env.REACT_APP_API_URL

  return <Spinner sx={{ height: '100%' }} />
}

export default Home
