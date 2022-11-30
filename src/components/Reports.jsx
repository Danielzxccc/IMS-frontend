import React, { useRef } from 'react'
import Sidebar from './Sidebar'
import '../css/reports.css'
import LineChart from './charts/LineChart'
import ReportTable from './tables/ReportTable'
import { useState } from 'react'
import ViewPaidOrder from './actions/ViewPaidOrder'
import Header from './header/Header'
import { useReactToPrint } from 'react-to-print'

const Reports = () => {
  const [viewModal, setViewModal] = useState(false)
  const [query, setQuery] = useState('')
  const [id, setID] = useState(null)

  const openModal = (id) => {
    setViewModal(true)
    setID(id)
  }

  const closeModal = () => {
    setViewModal(false)
  }
  const componentRef = useRef(null)
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    bodyClass: 'paid-order-print',
  })

  return (
    <section id='dashboard'>
      <nav>
        <Sidebar />
      </nav>
      <header>
        <Header title={'PRODUCT SALES'} />
      </header>
      <main>
        <div className='report-chart'>
          <LineChart />
        </div>
        <div className='report-paid-orders'>
          <h1>PAID ORDERS</h1>
        </div>
        <div className='report-paid-orders-filter'>
          <button className='paid-order-printBtn' onClick={handlePrint}>
            MAKE A COPY
          </button>
          <div>
            <span>
              <i className='bi bi-search'></i>
            </span>
            <input
              type='text'
              name='search'
              placeholder='search orders'
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div className='reports-table'>
          <table ref={componentRef}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Order ID.</th>
                <th>CUSTOMER`S NAME</th>
                <th>ADDRESS</th>
                <th>ORDER INFORMATION</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <ReportTable openModal={openModal} query={query} />
            </tbody>
          </table>
        </div>
      </main>
      {viewModal && <ViewPaidOrder closeModal={closeModal} id={id} />}
    </section>
  )
}

export default Reports
