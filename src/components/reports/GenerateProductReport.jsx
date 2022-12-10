import React, { useEffect, useRef } from 'react'
import Sidebar from '../Sidebar'
import '../../css/generateproductreport.css'
import axios from 'axios'

import { useReactToPrint } from 'react-to-print'
import { useNavigate } from 'react-router-dom'
import { formatPrice } from '../utils/priceFormatter'
import { useState } from 'react'

const GenerateProductReport = () => {
  const [data, setData] = useState([])
  const effectRan = useRef(false)
  const navigate = useNavigate()
  const componentRef = useRef(null)

  const fetchReports = async () => {
    try {
      const response = await axios.get('/products/reports')
      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (effectRan.current === true) {
      fetchReports()
    }
    return () => {
      effectRan.current = true
    }
  }, [])
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const handleBack = () => {
    navigate('/productreports')
  }

  return (
    <div id='generate'>
      <nav>
        <Sidebar />
      </nav>
      <main>
        <div className='generate-orders-header'>
          <span>
            <i
              className='bi bi-arrow-left-circle back-button-orders'
              onClick={handleBack}
            ></i>
            <button className='paid-order-printBtn' onClick={handlePrint}>
              MAKE A COPY
            </button>
          </span>
        </div>
        <div ref={componentRef}>
          {data.map((item, index) => (
            <div className='generate-product' key={index}>
              <div>
                <img src={item.pimageurl} />
              </div>
              <div>
                {/* DETAILS */}
                <div>
                  <div>
                    <span>PRODUCT NAME:</span> {item.pname}
                  </div>
                  <div>
                    <span>PRODUCT ID:</span> {item.id}
                  </div>
                  <div>
                    <span>CATEGORY:</span> {item.pcategory}
                  </div>
                  <div>
                    <span>SIZE:</span> {item.psize}
                  </div>
                  <div>
                    <span>DESCRIPTION:</span> {item.pdescript}
                  </div>
                </div>
                <div>
                  <div>
                    <div>
                      <span>COLOR:</span> {item.pcolor}
                    </div>
                    <div>
                      <span>PRICE:</span> P {formatPrice(item.price)}
                    </div>
                    <div>
                      <span>STOCKS:</span> {item.stocks}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <span className='generate-highlight'>
                    TOTAL ITEMS SOLD: <br /> <span>{item.qtysold}</span>
                  </span>
                </div>
                <div>
                  <span className='generate-highlight'>
                    TOTAL SALES: <br />
                    <span>P {formatPrice(item.productsales)}</span>
                  </span>
                </div>
                <div>
                  <span className='generate-highlight'>
                    ORDERS: <br /> <span>{item.orders}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default GenerateProductReport
