/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState()
  const [userData, setUserData] = useState({})

  return (
    <UserContext.Provider value={{ token, setToken, userData, setUserData }}>
      {children}
    </UserContext.Provider>
  )
}
export const UserAuth = () => {
  return useContext(UserContext)
}
