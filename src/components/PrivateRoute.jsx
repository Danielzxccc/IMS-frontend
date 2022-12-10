/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { Navigate, Outlet } from 'react-router-dom'
import { UserAuth } from '../context/authContext'

const PrivateRoute = ({ allowedRoles }) => {
  const { token, userData } = UserAuth()

  let auth = {
    token: token,
    roles: [userData?.role],
  }

  return auth?.roles?.find((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : auth?.token ? (
    <Navigate to='/' />
  ) : (
    <Navigate to='/unauthorize' />
  )
}

export default PrivateRoute
