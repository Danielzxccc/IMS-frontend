import React, { useState } from 'react'
import ProductReportBarchart from '../charts/ProductReportBarchart'
import Header from '../header/Header'
import Sidebar from '../Sidebar'
import '../../css/productreports.css'
import ProductTableReports from '../tables/ProductTableReports'
import ViewModalProducts from '../actions/ViewModalProducts'
import { useNavigate } from 'react-router-dom'

const ProductReports = () => {
  const [modalView, setModalView] = useState(false)
  const [viewID, setViewID] = useState(0)
  const navigate = useNavigate()
  
  const openViewModal = (id) => {
    setViewID(id)
    setModalView(true)
  }
  const redirectGenerate = () => {
    navigate('/productreports/generate')
  }
  return (
    <section id='dashboard'>
      <nav>
        <Sidebar />
      </nav>
      <header>
        <Header title={'PRODUCT REPORTS'} />
      </header>
      <main>
        <div className='barchart-report-wrapper'>
          <ProductReportBarchart />
        </div>
        <div>
          <Header title={'PRODUCTS'} />
        </div>
        <div>
          <button className='paid-order-printBtn' onClick={redirectGenerate}>
            GENERATE
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>PRICE</th>
              <th>STOCKS</th>
              <th>QUANTITY SOLD</th>
              <th>PRODUCT SALES</th>
              <th>ORDERS RECEIVE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <ProductTableReports openViewModal={openViewModal} />
          </tbody>
        </table>
      </main>
      {modalView && (
        <ViewModalProducts setModalView={setModalView} viewID={viewID} />
      )}
    </section>
  )
}

export default ProductReports
