import React, { useEffect } from 'react'
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
import { useState } from 'react'
import axios from 'axios'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
const LineChart = () => {
  const [lineData, setLineData] = useState([])
  const fetchReportData = async () => {
    try {
      const response = await axios.get('/paidorders/reportdata')
      const reports = response.data
      if (reports) {
        setLineData(reports[0])
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    return () => {
      fetchReportData()
    }
  }, [])

  const options = {
    maintainAspectRatio: false,
    responsive: true,
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
    labels: Object.keys(lineData),
    datasets: [
      {
        label: 'SALES',
        data: Object.values(lineData),
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
