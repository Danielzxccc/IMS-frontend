import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useRefresh from '../hooks/useRefresh'
import { UserAuth } from '../context/authContext'

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true)
  const refresh = useRefresh()
  const { userData } = UserAuth()

  useEffect(() => {
    let isMounted = true

    const verifyRefreshToken = async () => {
      try {
        await refresh()
      } catch (err) {
        console.error(err)
      } finally {
        isMounted && setIsLoading(false)
      }
    }

    !userData?.user ? verifyRefreshToken() : setIsLoading(false)

    return () => (isMounted = false)
  }, [])

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>
}

export default PersistLogin
