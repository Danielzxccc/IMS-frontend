import axios from 'axios'
import { UserAuth } from '../context/authContext'

const useRefresh = () => {
  const { setUserData, setToken } = UserAuth()

  const refresh = async () => {
    const response = await axios.get('/auth/refresh')
    setUserData(response.data.user)
    setToken(response.data.token)
    return response.data.user
  }
  return refresh
}

export default useRefresh
