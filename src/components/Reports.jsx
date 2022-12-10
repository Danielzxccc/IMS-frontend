import React from 'react'
import Sidebar from './Sidebar'
import '../css/reports.css'
import LineChart from './charts/LineChart'
import ReportTable from './tables/ReportTable'
import { useState } from 'react'
import ViewPaidOrder from './actions/ViewPaidOrder'
import Header from './header/Header'
import { useNavigate } from 'react-router-dom'

const Reports = () => {
  const [viewModal, setViewModal] = useState(false)
  const [query, setQuery] = useState('')
  const [id, setID] = useState(null)
  const [range, setRange] = useState('DEFAULT')
  const navigate = useNavigate()
  const openModal = (id) => {
    setViewModal(true)
    setID(id)
  }

  const closeModal = () => {
    setViewModal(false)
  }

  const generateReport = () => {
    navigate(`/salesreports/generate?range=${range}`)
  }

  const handleFilterDates = (e) => {
    const value = e.target.value
    switch (value) {
      case 'DEFAULT':
        setRange('DEFAULT')
        break
      case 'DAILY':
        setRange('DAILY')
        break
      case 'WEEKLY':
        setRange('WEEKLY')
        break
      case 'MONTHLY':
        setRange('MONTHLY')
        break
      case 'ANNUAL':
        setRange('ANNUAL')
        break
      default:
        break
    }
  }
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
          <div>
            <select
              name='filterReports'
              className='filterReports'
              onChange={handleFilterDates}
            >
              <option value='DEFAULT'>FILTER BY</option>
              <option value='DAILY'>DAILY</option>
              <option value='WEEKLY'>WEEKLY</option>
              <option value='MONTHLY'>MONTHLY</option>
              <option value='ANNUAL'>ANNUAL</option>
            </select>
            <button className='paid-order-printBtn' onClick={generateReport}>
              GENERATE
            </button>
          </div>
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
              <ReportTable openModal={openModal} query={query} range={range} />
            </tbody>
          </table>
        </div>
      </main>
      {viewModal && <ViewPaidOrder closeModal={closeModal} id={id} />}
    </section>
  )
}

export default Reports
