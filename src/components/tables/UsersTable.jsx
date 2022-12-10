/* eslint-disable react/prop-types */
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

const UsersTable = ({ query, openDeleteModal, openEditModal, reload }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['userTableData', reload],
    queryFn: async () => {
      const response = await axios.get('/users/get')
      return response.data
    },
  })
  if (isLoading)
    return (
      <tr>
        <td colSpan={9}>loading...</td>
      </tr>
    )

  if (error)
    return (
      <tr>
        <td colSpan={9}>error...</td>
      </tr>
    )

  return (
    <>
      {data
        .filter((item) => {
          return Object.keys(item).some((key) =>
            item[key]?.toString().toLowerCase().includes(query.toLowerCase())
          )
        })
        .map((item, index) => (
          <tr key={index}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.role}</td>
            <td>{item.status}</td>
            <td>{item.email}</td>
            <td>{item.contact}</td>
            <td>{item.username}</td>
            <td>
              <span>
                <i
                  className='bi bi-pencil-square'
                  onClick={() => openEditModal(item.id)}
                ></i>
                <i
                  className='bi bi-trash-fill'
                  onClick={() => openDeleteModal(item.id, item.name)}
                ></i>
              </span>
            </td>
          </tr>
        ))}
    </>
  )
}

export default UsersTable
