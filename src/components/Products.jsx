import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import '../css/products.css'
import axios from 'axios'
import DeleteModalProducts from './actions/DeleteModalProducts'
import { ToastContainer, toast } from 'react-toastify'
import AddModalProducts from './actions/AddModalProducts'
import Spinner from './Spinner'
import ViewModalProducts from './actions/ViewModalProducts'

const Products = () => {
  const [products, setProducts] = useState([])
  const [modalDelete, setModalDelete] = useState(false)
  const [modalAdd, setModalAdd] = useState(false)
  const [modalView, setModalView] = useState(false)
  const [query, setQuery] = useState('')
  const [viewID, setViewID] = useState(null)
  const [delID, setDelID] = useState(null)
  const [productName, setProductName] = useState('')
  const [reload, setReload] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/products/get')
      const products = response.data
      if (products) setProducts(products)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    return () => {
      fetchProducts()
    }
  }, [reload])
  // modal functions
  const openDeleteModal = (id, name) => {
    setModalDelete(true)
    setDelID(id)
    setProductName(name)
  }

  const closeDeleteModal = () => {
    setModalDelete(false)
  }

  const openViewModal = (id) => {
    setModalView(true)
    setViewID(id)
  }

  const submitDelete = async (id) => {
    try {
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
    }
  }
  return (
    <section id='dashboard'>
      <nav>
        <Sidebar />
      </nav>
      <header>
        <div className='product-head'>
          <div className='phead-1'></div>
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
          {products
            .filter((asd) => asd.pname.toLowerCase().includes(query))
            .map((item, index) => (
              <div className='product-item' key={index}>
                <img src={item.pimageurl} alt='' width={300} height={300} />
                <div className='product-info'>
                  <p>Product Name: {item.pname}</p>
                  <p>Category: {item.pcategory}</p>
                </div>
                <div className='product-actions'>
                  <div className='action-div1'></div>
                  <div
                    className='action-div2'
                    onClick={() => openViewModal(item.id)}
                  >
                    VIEW MORE
                  </div>
                  <div className='action-div3'>
                    <i className='bi bi-pencil-square'></i>
                    <i
                      className='bi bi-trash3-fill'
                      onClick={() => openDeleteModal(item.id, item.pname)}
                    ></i>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </main>
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
