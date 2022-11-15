/* eslint-disable react/prop-types */
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { format } from 'date-fns'
import React from 'react'

const ProductArchiveTable = ({
  openModalArchive,
  reload,
  openViewModal,
  handleCheckChange,
}) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['productArchive', reload],
    queryFn: async () => {
      const response = await axios.get('/products/archive')
      return response.data
    },
  })

  if (isLoading)
    return (
      <tr>
        <td colSpan={7}>loading...</td>
      </tr>
    )

  if (error)
    return (
      <tr>
        <td colSpan={7}>loading...</td>
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
          <td>
            {item.date_archive === null
              ? '--'
              : format(new Date(item.date_archive), 'P')}
          </td>
          <td>{item.id}</td>
          <td>{item.pname}</td>
          <td>P {item.price}</td>
          <td>
            <i
              className='fa-solid fa-eye'
              onClick={() => openViewModal(item.id)}
            ></i>
          </td>
          <td>
            <span onClick={() => openModalArchive(item.id, item.pname)}>
              Unarchive
            </span>
          </td>
        </tr>
      ))}
    </>
  )
}

export default ProductArchiveTable
