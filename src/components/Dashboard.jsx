import { UserAuth } from '../context/authContext'
import React from 'react'
import Sidebar from './Sidebar'
import '../css/dashboard.css'
import BarChart from './charts/BarChart'
import LineChart from './charts/LineChart'
import BestSelling from './charts/BestSelling'
import Earnings from './charts/Earnings'

const Dashboard = () => {
  const { userData } = UserAuth()
  return (
    <section id='dashboard'>
      <nav>
        <Sidebar />
      </nav>

      {/* HEADER */}
      <header>
        <div className='dashboard-header'>
          <h1>OVERVIEW</h1>
          <div>
            <p>
              Welcome, {userData.role}, {userData.name}
            </p>
            <img src='' />
          </div>
        </div>
      </header>

      <main>
        <div className='graph-wrapper'>
          <div className='graph-divider'>
            <div className='box-1'>
              <div className='reports-wrapper'>
                <Earnings />
              </div>
            </div>
            <div className='box-2'>
              <div className='barchart-wrapper'>
                <BarChart />
              </div>
            </div>
          </div>
          <div className='graph-divider'>
            <div className='box-3'>
              <BestSelling />
            </div>
            <div className='box-4'>
              <div className='linechart-wrapper'>
                <LineChart />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* GRAPHS SPACING */}
    </section>
  )
}

export default Dashboard
