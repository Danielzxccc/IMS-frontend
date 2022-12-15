import axios from 'axios'
import { UserAuth } from '../context/authContext'

const useRefresh = () => {
  const { setUserData, setToken } = UserAuth()

  const refresh = async () => {
    const response = await axios.get('/auth/refresh')

    setUserData((prev) => response.data.user)
    setToken(true)
    return response.data.user
  }
  return refresh
}

export default useRefresh
