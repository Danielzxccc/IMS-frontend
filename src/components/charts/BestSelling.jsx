import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

const BestSelling = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['BestSelling'],
    queryFn: async () => {
      const response = await axios.get('/paidorders/bestselling')
      return response.data[0].pimageurl
    },
  })

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message
  return (
    <div className='best-selling-wrapper'>
      <h4>BEST SELLING PRODUCT</h4>
      <img src={data} />
    </div>
  )
}

export default BestSelling
