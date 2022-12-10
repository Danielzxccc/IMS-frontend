/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react'
import Sidebar from '../Sidebar'
import '../../css/salesreports.css'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import { useState } from 'react'
import { format } from 'date-fns'

const SalesReports = () => {
  const [data, setData] = useState([])
  const [filterParams] = useSearchParams()
  const navigate = useNavigate()
  const componentRef = useRef()
  const effectRan = useRef(false)

  const fetchReports = async () => {
    try {
      const response = await axios.post('/paidorders/get', {
        range: filterParams.get('range'),
      })
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

  // const rangeParam = filterParams.get('range')
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const handleBack = () => {
    navigate('/salesreports')
  }

  return (
    <div id='generate'>
      <nav>
        <Sidebar />
      </nav>
      <main>
        <div className='generate-orders-header'>
          <span className='reports-range'>
            <i
              onClick={handleBack}
              className='bi bi-arrow-left-circle back-button-orders'
            ></i>
            <button className='btn generate-orders-btn' onClick={handlePrint}>
              MAKE A COPY
            </button>
          </span>
          <span>{''} REPORTS</span>
          <span></span>
        </div>
        <div ref={componentRef}>
          {data.map((item, index) => (
            <div className='generate-orders' key={index}>
              {/* 1st column */}
              <div>
                <div>
                  <span>DATE</span> {format(new Date(item.date_added), 'P')}
                </div>
                <div>
                  <span>ORDER ID :</span> {item.id}
                </div>
              </div>
              {/* 2nd column */}
              <div>
                <div>
                  <span>CUSTOMER NAME:</span> {item.cname}
                </div>
                <div>
                  <span>ADDRESS:</span> {item.street} {item.barangay}{' '}
                  {item.city} {item.region} {item.country}
                </div>
                <div>
                  <span>CONTACT NO.:</span> {item.contact}
                </div>
                <div>
                  <span>TOTAL PRICE:</span>P {item.price}
                </div>
                <div>
                  <span>QUANTITY:</span> {item.quantity}
                </div>
                <div>
                  <span>PAYMENT METHOD:</span> {item.pmethod}
                </div>
              </div>
              {/* 3rd column */}
              <div>
                <div>
                  <span>PRODUCT NAME:</span> {item.pname}
                </div>
                <div>
                  <span>SIZE:</span> {item.psize}
                </div>
                <div>
                  <span>COLOR:</span> {item.pcolor}
                </div>
                <div>
                  <span>CATEGORY:</span> {item.pcategory}
                </div>
                <div>
                  <span>DELIVERY METHOD:</span> {item.dmethod}
                </div>
                <div>
                  <span>STORE:</span> {item.st_name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default SalesReports
