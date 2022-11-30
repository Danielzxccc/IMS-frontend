import React from 'react'
import axios from 'axios'
import '../../css/archiveproducts.css'
import { toast, ToastContainer } from 'react-toastify'
import { useState } from 'react'
import Sidebar from '../Sidebar'
import Header from '../header/Header'
import ProductArchiveTable from '../tables/ProductArchiveTable'
import UnarchiveModalProduct from '../actions/UnarchiveModalProduct'
import ViewModalProducts from '../actions/ViewModalProducts'
import MultipleUnarchiveModal from '../actions/MultipleUnarchiveModal'

const ProductArchive = () => {
  const [proID, setProID] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [confirmation, setConfirmation] = useState(false)
  const [productName, setProductName] = useState('')
  const [modalView, setModalView] = useState(false)
  const [viewID, setViewID] = useState(null)
  const [reload, setReload] = useState(false)
  const [checkedValues, setCheckedValues] = useState([])
  // const [isChecked, setIsChecked] = useState(false)

  const handleCheckChange = (e) => {
    // Destructuring
    const { value, checked } = e.target

    console.log(`${value} is ${checked}`)

    // Case 1 : The user checks the box
    if (checked) {
      setCheckedValues([...checkedValues, value])
    } else {
      setCheckedValues(checkedValues.filter((e) => e !== value))
    }
  }

  const openModalArchive = (id, name) => {
    setProID(id)
    setOpenModal(true)
    setProductName(name)
  }

  const openViewModal = (id) => {
    setModalView(true)
    setViewID(id)
  }

  const multipleUnarchive = async () => {
    try {
      if (checkedValues.length) {
        const response = await axios.put('/products/multiplearchive', {
          products: checkedValues,
        })
        if (response)
          toast.success('Unarchived Successfully', {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          })
        setReload(!reload)
        setConfirmation(false)
      } else {
        toast.error('no product selected', {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
        setConfirmation(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const unarchiveProduct = async (id) => {
    try {
      const response = await axios.put(`/products/unarchive/${id}`)
      if (response) {
        toast.success('Unarchived Successfully', {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
        setOpenModal(false)
        setReload(!reload)
      }
    } catch (error) {
      console.log(error.stack)
    }
  }
  return (
    <section id='dashboard'>
      <nav>
        <Sidebar />
      </nav>
      <header>
        <Header title={'ARCHIVED PRODUCTS'} />
      </header>
      <main>
        <div className='archive-body'>
          <div className='select-all'>
            <p onClick={() => setConfirmation(true)}>Unarchive</p>
          </div>
          <div className='archive-table'>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Date Archived</th>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <ProductArchiveTable
                  openModalArchive={openModalArchive}
                  openViewModal={openViewModal}
                  reload={reload}
                  handleCheckChange={handleCheckChange}
                />
              </tbody>
            </table>
          </div>
        </div>
      </main>
      {confirmation && (
        <MultipleUnarchiveModal
          multipleUnarchive={multipleUnarchive}
          setConfirmation={setConfirmation}
        />
      )}
      {openModal && (
        <UnarchiveModalProduct
          unarchiveProduct={unarchiveProduct}
          proID={proID}
          productName={productName}
          setOpenModal={setOpenModal}
        />
      )}
      {modalView && (
        <ViewModalProducts setModalView={setModalView} viewID={viewID} />
      )}
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </section>
  )
}

export default ProductArchive
