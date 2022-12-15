/* eslint-disable react/prop-types */
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { formatPrice } from '../utils/priceFormatter'

const ProductTableReports = ({ openViewModal }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['productTableReports'],
    queryFn: async () => {
      const response = await axios.get('/products/reports')
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

  const formatData = (item) => {
    if (item === null) return 0
    else return item
  }

  return (
    <>
      {data.map((item, index) => (
        <tr key={index}>
          <td>
            {item.pname} - {item.pcategory} - {item.psize} - {item.pcolor}{' '}
          </td>
          <td>P {formatPrice(item.price)}</td>
          <td
            style={{
              color: item.stocks < 10 ? 'red' : 'black',
              fontWeight: item.stocks < 10 ? 'bold' : 'normal',
            }}
          >
            {item.stocks}
          </td>
          <td>{formatData(item.qtysold)}</td>
          <td>P {formatPrice(item.productsales)}</td>
          <td>{formatData(item.orders)}</td>
          <td>
            <i
              className='fa-solid fa-eye report-eye'
              onClick={() => openViewModal(item.id)}
            ></i>
          </td>
        </tr>
      ))}
    </>
  )
}

export default ProductTableReports
