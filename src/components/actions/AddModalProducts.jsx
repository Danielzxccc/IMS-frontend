/* eslint-disable react/prop-types */
import axios from 'axios'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import React, { useState } from 'react'
import '../../css/addmodalproducts.css'
import { toast } from 'react-toastify'
import { storage } from '../../firebase'
import { useRef } from 'react'
const AddModalProducts = ({ setModalAdd, setReload, setLoading, reload }) => {
  const [products, setProducts] = useState({
    pname: '',
    pcategory: 'SHIRT',
    price: '',
    pcolor: 'White',
    psize: 'S',
    stocks: '',
    pdescript: '',
    pstatus: 'available',
    pimageurl: '',
    psales: 0,
  })
  const [file, setFile] = useState(null)
  const [imageUpload, setImageUpload] = useState(null)
  const productNameRef = useRef(null)

  // handle changes
  const handleProductName = (e) => {
    setProducts({ ...products, pname: e.target.value })
  }

  const handleCategory = (e) => {
    setProducts({ ...products, pcategory: e.target.value })
  }

  const handleSize = (e) => {
    setProducts({ ...products, psize: e.target.value })
    // productNameRef.current.value = `${products.pname} - ${e.target.value} - ${products.pcolor}`
  }

  const handleColor = (e) => {
    setProducts({ ...products, pcolor: e.target.value })
    // productNameRef.current.value = `${products.pname} - ${products.psize} - ${e.target.value}`
  }

  const handleProductDescription = (e) => {
    setProducts({ ...products, pdescript: e.target.value })
  }

  const handleStocks = (e) => {
    setProducts({ ...products, stocks: e.target.value })
  }

  const handlePrice = (e) => {
    setProducts({ ...products, price: e.target.value })
  }

  const uploadImage = () => {
    return new Promise((resolve) => {
      if (imageUpload === null) return
      setLoading(true)
      const imageRef = ref(storage, `images/${imageUpload.name + uuidv4()}`)
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          resolve([url, snapshot.ref.fullPath])
        })
      })
    })
  }

  // handle submit
  const submitProduct = async (e) => {
    e.preventDefault()
    try {
      const upload = await uploadImage()
      console.log(upload[0] + ' ' + upload[1])
      const response = await axios.post('/products/create', {
        pname: productNameRef.current.value,
        pcategory: products.pcategory,
        price: products.price,
        pcolor: products.pcolor,
        psize: products.psize,
        stocks: products.stocks,
        pdescript: products.pdescript,
        pimageurl: upload[0],
        pimagename: upload[1],
        psales: 0,
      })
      const data = response.data
      if (data) {
        setReload(!reload)
        setModalAdd(false)
        setLoading(false)
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
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = async (e) => {
    setFile(URL.createObjectURL(e.target.files[0]))
    setImageUpload(e.target.files[0])
  }
  return (
    <div className='modal-product-add'>
      <div className='modal-content-product-add'>
        <div className='add-exit-product'>
          <span onClick={() => setModalAdd(false)}>✖</span>
        </div>
        <div className='head-add-products'>
          <h1>ADD PRODUCT</h1>
        </div>
        <form onSubmit={submitProduct}>
          <div className='body-add-products'>
            <div className='left-body-products'>
              <label>PRODUCT NAME</label>
              <input
                ref={productNameRef}
                type='text'
                className='product-name'
                onChange={handleProductName}
                required
              />
              <label>CATEGORY</label>
              <div className='modal-add-products-form-group'>
                <input
                  type='radio'
                  name='category'
                  value='SHIRT'
                  onChange={handleCategory}
                  required
                />
                <p>SHIRT</p>
              </div>
              <div className='modal-add-products-form-group'>
                <input
                  type='radio'
                  name='category'
                  value='HOODIE'
                  onChange={handleCategory}
                  required
                />
                <p>HOODIE</p>
              </div>

              <div className='product-variation'>
                <div className='product-size'>
                  <label>SIZE</label>
                  <select name='size' onChange={handleSize} required>
                    <option value='S'>S</option>
                    <option value='M'>M</option>
                    <option value='L'>L</option>
                    <option value='XL'>XL</option>
                    <option value='XXL'>XXL</option>
                  </select>
                </div>
                <div className='product-color'>
                  <label>COLOR</label>
                  <select name='color' onChange={handleColor} required>
                    <option value='White'>White</option>
                    <option value='Black'>Black</option>
                  </select>
                </div>
              </div>
              <label>PRODUCT DESCRIPTION</label>
              <textarea
                name='pdescript'
                cols='30'
                rows='5'
                onChange={handleProductDescription}
                required
              ></textarea>
            </div>
            <div className='right-body-products'>
              <label>UPLOAD IMAGE</label>
              <input type='file' onChange={handleChange} required />
              <div className='product-image-preview'>
                <img src={file} width={240} height={200} />
              </div>
              {/* <label>STATUS</label>
              <input type='text' onChange={handleStatus} /> */}
              <label>STOCKS</label>
              <input type='number' onChange={handleStocks} required />
              <label>PRICE</label>
              <input type='number' onChange={handlePrice} required />
            </div>
          </div>
          <div className='footer-add-products'>
            <button type='submit'>ADD</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddModalProducts
