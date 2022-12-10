import React, { useEffect, useRef, useState } from 'react'
import Sidebar from './Sidebar'
import '../css/products.css'
import axios from 'axios'
import DeleteModalProducts from './actions/DeleteModalProducts'
import { ToastContainer, toast } from 'react-toastify'
import AddModalProducts from './actions/AddModalProducts'
import Spinner from './utils/Spinner'
import ViewModalProducts from './actions/ViewModalProducts'
import EditModalProducts from './actions/EditModalProducts'
import ProductItems from './ProductItems'

const Products = () => {
  const [products, setProducts] = useState([])
  const [modalDelete, setModalDelete] = useState(false)
  const [modalAdd, setModalAdd] = useState(false)
  const [modalView, setModalView] = useState(false)
  const [modalEdit, setModalEdit] = useState(false)
  const [query, setQuery] = useState('')
  const [viewID, setViewID] = useState(null)
  const [delID, setDelID] = useState(null)
  const [editID, setEditID] = useState(null)
  const [productName, setProductName] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [imageName, setImageName] = useState('')
  const [reload, setReload] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openNotif, setOpenNotif] = useState(false)
  const [notifList, setNotifList] = useState([])

  // modal functions
  const handleOpenNotif = () => {
    setOpenNotif(!openNotif)
  }

  const openDeleteModal = (id, name, image) => {
    setModalDelete(true)
    setDelID(id)
    setProductName(name)
    setImageName(image)
  }

  const closeDeleteModal = () => {
    setModalDelete(false)
  }

  const openViewModal = (id) => {
    setModalView(true)
    setViewID(id)
  }

  const openEditModal = (id) => {
    setModalEdit(true)
    setEditID(id)
    setOpenNotif(false)
  }

  const closeEditModal = () => {
    setModalEdit(false)
  }

  const fetchNotif = async () => {
    try {
      const response = await axios.get('/paidorders/lowstocks')
      setNotifList(response.data)
    } catch (error) {
      console.log(error.stack)
    }
  }
  const effectRan = useRef(false)
  useEffect(() => {
    if (effectRan.current === true) {
      fetchNotif()
    }
    return () => {
      effectRan.current = true
    }
  }, [reload])

  const submitDelete = async (id) => {
    try {
      // const desertRef = ref(storage, imageName)
      // const deleteImage = await deleteObject(desertRef)
      // console.log(deleteImage)

      const response = await axios.delete(`/products/delete/${id}`)
      if (response) {
        setProducts(products.filter((item) => item.id !== id))
        toast.success('Deleted Successfully', {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
      } else {
        toast.error('error', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
      }
      setModalDelete(false)
    } catch (error) {
      toast.error('error', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
      console.log(error)
    }
  }
  return (
    <section id='dashboard'>
      <nav>
        <Sidebar />
      </nav>
      <header>
        <div className='product-head'>
          <div className='phead-1'>
            <span>
              <span>
                <i
                  className='bi bi-bell-fill blue-icon'
                  onClick={handleOpenNotif}
                ></i>
                <span className='badge-notif'>{notifList.length}</span>
              </span>
              {openNotif && (
                <div className='notification-container'>
                  {notifList.map((item, index) => (
                    <div
                      className='notification-item'
                      key={index}
                      onClick={() => openEditModal(item.id)}
                    >
                      <img
                        src={item.pimageurl}
                        alt=''
                        height={100}
                        width={100}
                      />
                      <div>Product {item.pname} is on low stock</div>
                      <div></div>
                    </div>
                  ))}
                </div>
              )}
            </span>
          </div>
          <div className='phead-2'>
            <h1>ALL PRODUCTS</h1>
          </div>
          <div className='picons'>
            <input type='text' onChange={(e) => setQuery(e.target.value)} />
            <i className='bi bi-search'></i>
            <i className='bi bi-plus-lg' onClick={() => setModalAdd(true)}></i>
          </div>
        </div>
      </header>
      <main>
        <div className='product-body'>
          <ProductItems
            products={products}
            setProducts={setProducts}
            query={query}
            openViewModal={openViewModal}
            openEditModal={openEditModal}
            openDeleteModal={openDeleteModal}
            reload={reload}
          />
        </div>
      </main>
      {/* MODALS  */}
      {modalEdit && (
        <EditModalProducts
          closeEditModal={closeEditModal}
          editID={editID}
          setLoading={setLoading}
          setReload={setReload}
          reload={reload}
        />
      )}
      {modalView && (
        <ViewModalProducts setModalView={setModalView} viewID={viewID} />
      )}
      {modalDelete && (
        <DeleteModalProducts
          closeDeleteModal={closeDeleteModal}
          delID={delID}
          productName={productName}
          submitDelete={submitDelete}
        />
      )}
      {modalAdd && (
        <AddModalProducts
          setModalAdd={setModalAdd}
          setReload={setReload}
          reload={reload}
          setLoading={setLoading}
        />
      )}
      {loading ? <Spinner /> : <></>}
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

export default Products
