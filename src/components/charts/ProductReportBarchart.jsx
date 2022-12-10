import React from 'react'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const ProductReportBarchart = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['ProductReportData'],
    queryFn: async () => {
      const response = await axios.get('/products/reports')
      return response.data
    },
  })

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message
  //chart config
  const options = {
    maintainAspectRatio: false,
    color: '#FFFFFF',
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'AVAILABLE PRODUCTS',
        color: '#FFFFFF',
      },
      scales: {
        grid: {
          color: 'white',
        },
      },
    },
  }
  //   chart data
  const productData = {
    labels: data?.map((data) => data.pname),
    color: '#FFFFFF',
    datasets: [
      {
        label: 'Quantity Sold',
        data: data?.map((data) => data.qtysold),
        backgroundColor: ['#41B8D5'],
      },
      {
        label: 'Product Sales',
        data: data?.map((data) => data.productsales),
        backgroundColor: ['#F1AF24'],
        hidden: true,
      },
      {
        label: 'Orders Received',
        data: data?.map((data) => data.orders),
        backgroundColor: ['#FFF'],
      },
    ],
  }
  return (
    <div>
      <Bar
        data={productData}
        options={options}
        className='barchart-report-products'
      />
    </div>
  )
}

export default ProductReportBarchart
