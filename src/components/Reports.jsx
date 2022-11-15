import React from 'react'
import Sidebar from './Sidebar'
import '../css/reports.css'
import LineChart from './charts/LineChart'
import ReportTable from './tables/ReportTable'
import { useState } from 'react'
import ViewPaidOrder from './actions/ViewPaidOrder'

const Reports = () => {
  const [viewModal, setViewModal] = useState(false)
  const [id, setID] = useState(null)

  const openModal = (id) => {
    setViewModal(true)
    setID(id)
  }

  const closeModal = () => {
    setViewModal(false)
  }

  return (
    <section id='dashboard'>
      <nav>
        <Sidebar />
      </nav>
      <header>
        <div className='reports-header'>
          <h1>PRODUCT SALES</h1>
        </div>
      </header>
      <main>
        <div className='report-chart'>
          <LineChart />
        </div>
        <div className='report-paid-orders'>
          <h1>PAID ORDERS</h1>
        </div>
        <div className='reports-table'>
          <table>
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
              <ReportTable openModal={openModal} />
            </tbody>
          </table>
        </div>
      </main>
      {viewModal && <ViewPaidOrder closeModal={closeModal} id={id} />}
    </section>
  )
}

export default Reports
