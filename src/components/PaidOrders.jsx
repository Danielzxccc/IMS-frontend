/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import '../css/paidorders.css'
import axios from 'axios'
import { useRef } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Header from './header/Header'
import { fetchStocks } from './utils/notifEmmitter'

const PaidOrders = ({ dispatch }) => {
  const [pickup, setPickup] = useState(true)
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
    tprice: 0,
    quantity: 1,
    street: '',
    barangay: '',
    city: '',
    region: '',
    country: '',
    postal: 0,
    contact: 0,
  })

  const navigate = useNavigate()

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
      toast.error('Quantity exceeded the available stocks', {
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

  //set default addresses
  useEffect(() => {
    if (pickup === true)
      if (paidOrders.st_name === 'HM') {
        setPaidOrders({
          ...paidOrders,
          street: '1049 Unit 3C',
          barangay: 'Arrellano Ave',
          city: 'Manila',
          region: 'NCR',
          country: 'Philippines',
          postal: '1108',
        })
      } else if (paidOrders.st_name === 'DBTK') {
        setPaidOrders({
          ...paidOrders,
          street: '38 Shorthorn',
          barangay: 'Project 8',
          city: 'Quezon City',
          region: 'NCR',
          country: 'Philippines',
          postal: '1106',
        })
      } else {
        setPaidOrders({
          ...paidOrders,
          street: '',
          barangay: '',
          city: '',
          region: '',
          country: '',
          postal: '0',
        })
      }
  }, [paidOrders.st_name])

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

      setTimeout(() => {
        fetchStocks(axios, dispatch)
        navigate('/salesreports')
      }, 2000)
    } catch (error) {
      console.log(error)
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
    }
  }

  return (
    <section id='dashboard'>
      <nav>
        <Sidebar />
      </nav>
      <header>
        <Header title={'PAID ORDERS'} />
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
                  onClick={() => setPickup(true)}
                  onChange={handleChange}
                  required
                />
                <label>GCASH</label>
                <input
                  type='radio'
                  name='pmethod'
                  onClick={() => setPickup(true)}
                  onChange={handleChange}
                  value='COD'
                  required
                />
                <label>COD</label>
                <input
                  type='radio'
                  name='pmethod'
                  onClick={() => setPickup(false)}
                  onChange={handleChange}
                  value='PICKUP'
                  required
                />
                <label>DIRECT</label>
                <input
                  type='radio'
                  name='pmethod'
                  onClick={() => setPickup(true)}
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
              {pickup && (
                <>
                  <label>DELIVERY METHOD</label>
                  <select name='dmethod' onChange={handleChange}>
                    <option value='JT'>J&T DELIVERY</option>
                    <option value='LALAMOVE'>LALAMOVE</option>
                    <option value='NINJAVAN'>NINJAVAN</option>
                  </select>
                </>
              )}
              {pickup && (
                <>
                  <label>STORE</label>
                  <select name='st_name' onChange={handleChange}>
                    <option value=''>Select an Address</option>
                    <option value='HM'>HIGH MINDS CLOTHING</option>
                    <option value='DBTK'>DBTK</option>
                  </select>{' '}
                </>
              )}
            </div>
          </div>
          {pickup && (
            <div className='po-address'>
              <h2>ADDRESS</h2>
              <label>STREET</label>
              <input
                type='text'
                name='street'
                defaultValue={paidOrders.street}
                onChange={handleChange}
                className='po-street'
              />
              <div className='po-address-row'>
                <div className='po-address-input-group'>
                  <label>BARANGAY</label>
                  <input
                    type='text'
                    name='barangay'
                    defaultValue={paidOrders.barangay}
                    onChange={handleChange}
                  />
                </div>
                <div className='po-address-input-group'>
                  <label>CITY</label>
                  <input
                    type='text'
                    name='city'
                    defaultValue={paidOrders.city}
                    onChange={handleChange}
                  />
                </div>
                <div className='po-address-input-group'>
                  <label>REGION</label>
                  <input
                    type='text'
                    name='region'
                    defaultValue={paidOrders.region}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className='po-address-row'>
                <div className='po-address-input-group'>
                  <label>COUNTRY</label>
                  <input
                    type='text'
                    name='country'
                    defaultValue={paidOrders.country}
                    onChange={handleChange}
                  />
                </div>
                <div className='po-address-input-group'>
                  <label>POSTAL CODE</label>
                  <input
                    type='text'
                    name='postal'
                    defaultValue={paidOrders.postal}
                    onChange={handleChange}
                  />
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
