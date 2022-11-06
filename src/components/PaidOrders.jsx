import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import '../css/paidorders.css'
import axios from 'axios'
import { useRef } from 'react'
import { toast, ToastContainer } from 'react-toastify'

const PaidOrders = () => {
  const [cod, setCOD] = useState(true)
  const [products, setProducts] = useState([])
  const [size, setSize] = useState('')
  const [color, setColor] = useState('')
  const [price, setPrice] = useState('')
  const [tprice, setTprice] = useState(null)
  const [stocks, setStocks] = useState(null)
  const [category, setCategory] = useState('')
  const [paidOrders, setPaidOrders] = useState({
    cname: '',
    product_id: null,
    st_name: '',
    dmethod: '',
    pmethod: '',
    tprice: null,
    quantity: 1,
    street: null,
    barangay: null,
    city: null,
    region: null,
    country: null,
    postal: null,
    contact: 0,
  })

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
  }, [])
  const quantity = useRef()
  // const totalPrice = useRef()
  useEffect(() => {
    axios.get(`/products/get/${paidOrders.product_id}`).then((result) => {
      setSize(result.data[0].psize)
      setColor(result.data[0].pcolor)
      setCategory(result.data[0].pcategory)
      setPrice(result.data[0].price)
      setStocks(result.data[0].stocks)
    })
    quantity.current.value = 0
    setTprice(0)
  }, [paidOrders.product_id])

  useEffect(() => {
    setTprice(paidOrders.quantity * price)
    if (quantity.current.value === stocks) {
      toast.error('SOBRA KA NA Bhi3', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    }
  }, [paidOrders.quantity])

  const handleChange = (e) => {
    const { name, value } = e.target
    setPaidOrders((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const submitPaidOrder = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/paidorders/create', {
        cname: paidOrders.cname,
        product_id: paidOrders.product_id,
        st_name: paidOrders.st_name,
        dmethod: paidOrders.dmethod,
        pmethod: paidOrders.pmethod,
        tprice: tprice,
        quantity: paidOrders.quantity,
        street: paidOrders.street,
        barangay: paidOrders.barangay,
        city: paidOrders.city,
        region: paidOrders.region,
        country: paidOrders.country,
        postal: paidOrders.postal,
        contact: paidOrders.contact,
      })
      if (response)
        toast.success('Added Successfully', {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
      console.log(response)
    } catch (error) {
      toast.error('Error Occured', {
        position: 'top-center',
        autoClose: 1000,
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
        <div className='po-header'>
          <h1>PAID ORDERS</h1>
        </div>
      </header>
      <main>
        <form onSubmit={submitPaidOrder}>
          <div className='po-wrapper'>
            <div className='po-first-row'>
              <label>CUSTOMER NAME</label>
              <input
                type='text'
                name='cname'
                onChange={handleChange}
                required
              />
              <label>PAYMENT METHOD</label>
              <div className='po-radio-group'>
                <input
                  type='radio'
                  name='pmethod'
                  value='GCASH'
                  onClick={() => setCOD(true)}
                  onChange={handleChange}
                  required
                />
                <label>GCASH</label>
                <input
                  type='radio'
                  name='pmethod'
                  onClick={() => setCOD(true)}
                  onChange={handleChange}
                  value='COD'
                  required
                />
                <label>COD</label>
                <input
                  type='radio'
                  name='pmethod'
                  onClick={() => setCOD(false)}
                  onChange={handleChange}
                  value='PICKUP'
                  required
                />
                <label>PICK UP</label>
                <input
                  type='radio'
                  name='pmethod'
                  onClick={() => setCOD(true)}
                  value='BANK'
                  onChange={handleChange}
                  required
                />
                <label>BANK</label>
              </div>
              <label>TOTAL PRICE</label>
              <input
                type='number'
                name='tprice'
                defaultValue={tprice}
                required
                readOnly
              />
              <label>QUANTITY</label>
              <input
                type='number'
                name='quantity'
                min='1'
                max={stocks}
                className='po-quantity'
                onChange={handleChange}
                ref={quantity}
                required
              />
            </div>
            <div className='po-second-row'>
              <label>PRODUCT NAME</label>
              <select
                name='product_id'
                onChange={handleChange}
                defaultValue='1'
                required
              >
                <option defaultValue='0'>Please Select a Product</option>
                {products
                  .filter((data) => data.stocks > 0)
                  .map((item, index) => (
                    <option value={item.id} key={index}>
                      {item.pname}
                    </option>
                  ))}
              </select>
              <div className='po-size-color-wrapper'>
                <div className='po-size-color'>
                  <label>SIZE</label>
                  <input type='text' required readOnly defaultValue={size} />
                </div>
                <div className='po-size-color'>
                  <label>COLOR</label>
                  <input type='text' required readOnly defaultValue={color} />
                </div>
              </div>
              <label>CATEGORY</label>
              <input type='text' required readOnly defaultValue={category} />
              {cod && (
                <>
                  <label>DELIVERY METHOD</label>
                  <select name='dmethod' onChange={handleChange}>
                    <option value='PICK UP'>PICK UP</option>
                    <option value='LALAMOVE'>LALAMOVE</option>
                    <option value='NINJAVAN'>NINJAVAN</option>
                  </select>
                </>
              )}
              <label>STORE</label>
              <select name='st_name' onChange={handleChange}>
                <option value=''>SM Fairview</option>
              </select>
            </div>
          </div>
          {cod && (
            <div className='po-address'>
              <h2>ADDRESS</h2>
              <label>STREET</label>
              <input
                type='text'
                name='street'
                onChange={handleChange}
                className='po-street'
              />
              <div className='po-address-row'>
                <div className='po-address-input-group'>
                  <label>BARANGAY</label>
                  <input type='text' name='barangay' onChange={handleChange} />
                </div>
                <div className='po-address-input-group'>
                  <label>CITY</label>
                  <input type='text' name='city' onChange={handleChange} />
                </div>
                <div className='po-address-input-group'>
                  <label>REGION</label>
                  <input type='text' name='region' onChange={handleChange} />
                </div>
              </div>
              <div className='po-address-row'>
                <div className='po-address-input-group'>
                  <label>COUNTRY</label>
                  <input type='text' name='country' onChange={handleChange} />
                </div>
                <div className='po-address-input-group'>
                  <label>POSTAL CODE</label>
                  <input type='text' name='postal' onChange={handleChange} />
                </div>
                <div className='po-address-input-group'>
                  <label>CONTACT NO.</label>
                  <input type='text' name='contact' onChange={handleChange} />
                </div>
              </div>
            </div>
          )}
          <div className='po-footer'>
            <button type='submit'>ADD RECORD</button>
          </div>
        </form>
      </main>
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

export default PaidOrders
