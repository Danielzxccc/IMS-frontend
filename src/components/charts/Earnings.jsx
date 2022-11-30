import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

const Earnings = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['Earnings'],
    queryFn: async () => {
      const response = await axios.get('/paidorders/reports')
      return response.data[0]
    },
  })

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message
  return (
    <>
      <div>
        <h4>Daily :</h4>
        <h4>Weekly :</h4>
        <h4>Monthly :</h4>
        <h4>Annual :</h4>
      </div>
      <div>
        <h4>P {data.daily === null ? '0' : data.daily}</h4>
        <h4>P {data.weekly === null ? '0' : data.weekly}</h4>
        <h4>P {data.monthly}</h4>
        <h4>P {data.yearly}</h4>
      </div>
    </>
  )
}

export default Earnings
