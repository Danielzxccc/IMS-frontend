import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
ChartJS.defaults.font.size = 16
const LineChart = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['ReportData'],
    queryFn: async () => {
      const response = await axios.get('/paidorders/reportdata')
      return response.data[0]
    },
  })

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  const options = {
    maintainAspectRatio: false,
    color: '#FFFFFF',
    plugins: {
      legend: {
        position: 'top',
      },
      responsive: true,
      title: {
        display: true,
        text: 'PRODUCT SALES',
        color: '#FFFFFF',
      },
    },
  }
  const linedata = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'SALES',
        data: Object.values(data),
        fill: false,
        borderColor: '#41B8D5',
        tension: 0.3,
      },
    ],
  }
  return (
    <div>
      <Line data={linedata} options={options} className='linechart' />
    </div>
  )
}

export default LineChart
