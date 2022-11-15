/* eslint-disable react/prop-types */
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { format } from 'date-fns'

const ReportTable = ({ openModal }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['tableData'],
    queryFn: async () => {
      const response = await axios.get('/paidorders/get')
      return response.data
    },
  })

  if (isLoading)
    return (
      <tr>
        <td colSpan={6}>loading...</td>
      </tr>
    )

  if (error)
    return (
      <tr>
        <td colSpan={6}>loading...</td>
      </tr>
    )

  return (
    <>
      {data.map((item, index) => (
        <tr key={index}>
          <td>{format(new Date(item.date_added), 'P')}</td>
          <td>{item.id}</td>
          <td>{item.cname}</td>
          <td>
            {item.street} {item.barangay} {item.city} {item.region}
          </td>
          <td>
            {item.pname} {item.pcolor} {item.psize}
          </td>
          <td>
            <i
              className='fa-solid fa-eye'
              onClick={() => openModal(item.id)}
            ></i>
          </td>
        </tr>
      ))}
      {/* <tr>
        <td></td>
      </tr> */}
    </>
  )
}

export default ReportTable
