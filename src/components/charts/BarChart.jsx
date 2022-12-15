import React, { useEffect, useState } from 'react'
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
import { useRef } from 'react'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const BarChart = () => {
  const [products, setProducts] = useState([])

  const chartReference = useRef()
  const chart = chartReference.current

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/products/get')
      const products = response.data
      if (products) {
        setProducts(products)
      }
    } catch (error) {
      console.log(error)
    }
  }

  //colors
  const chartColors = {
    // red: '#F1AF24',
    // orange: '#E05003',
    yellow: '#F1AF24',
    blue: '#41B8D5',
  }
  const updateColor = () => {
    for (let i = 0; i < chart.data.datasets[0].data.length; i++) {
      if (chart.data.datasets[0].data[i] <= 10) {
        chart.data.datasets[0].backgroundColor[i] = chartColors.yellow
      } else {
        chart.data.datasets[0].backgroundColor[i] = chartColors.blue
      }
    }
    chart.ctx.textAlign = 'center'
    chart.update()
  }
  //fetch data
  useEffect(() => {
    return () => {
      fetchProducts()
    }
  }, [])

  setTimeout(() => {
    updateColor()
  }, 500)

  //chart config
  const options = {
    maintainAspectRatio: false,
    indexAxis: 'y',
    color: '#FFFFFF',
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    plugins: {
      legend: {
        position: 'right',
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
  //chart data
  const productData = {
    labels: products.map((data) => `${data.pname} - ${data.psize}`),
    color: '#FFFFFF',
    datasets: [
      {
        label: 'STOCKS',
        data: products.map((data) => data.stocks),
        backgroundColor: [chartColors.blue],
      },
    ],
  }

  return (
    <div>
      <Bar
        options={options}
        data={productData}
        className='barchart'
        ref={chartReference}
      />
    </div>
  )
}

export default BarChart
