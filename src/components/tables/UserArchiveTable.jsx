/* eslint-disable react/prop-types */
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

const UserArchiveTable = ({ handleCheckChange, reload }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['usersArchive', reload],
    queryFn: async () => {
      const response = await axios.get('/users/archives')
      return response.data
    },
  })
  if (isLoading)
    return (
      <tr>
        <td colSpan={5}>loading...</td>
      </tr>
    )

  if (error)
    return (
      <tr>
        <td colSpan={5}>error...</td>
      </tr>
    )
  return (
    <>
      {data.map((item, index) => (
        <tr key={index}>
          <td>
            <input
              type='checkbox'
              name='unarchived'
              value={item.id}
              onChange={handleCheckChange}
            />
          </td>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.role}</td>
          <td>{item.status}</td>
        </tr>
      ))}
    </>
  )
}

export default UserArchiveTable
