/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import '../../css/viewmodalproducts.css'
import { useState } from 'react'
import axios from 'axios'
const ViewModalProducts = ({ setModalView, viewID }) => {
  const [product, setProduct] = useState([
    {
      id: 0,
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
    },
  ])

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/products/get/${viewID}`)
      const data = response.data
      if (data) setProduct(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    return () => {
      fetchProduct()
    }
  }, [])

  return (
    <div className='modal-product-view'>
      <div className='modal-content-product-view'>
        <div className='product-view-wrapper'>
          <div className='product-view-image'>
            <img src={product[0].pimageurl} />
          </div>
          <div className='product-view-info'>
            <p>
              PRODUCT NAME:{' '}
              <span>
                {product[0].pname} - {product[0].pcategory} - {product[0].psize}{' '}
                - {product[0].pcolor}
              </span>
            </p>
            <p>
              PRODUCT ID: <span>{product[0].id}</span>
            </p>
            <p>
              PRICE: <span>P {product[0].price}</span>
            </p>
            <p>
              STOCKS: <span>{product[0].stocks}</span>
            </p>
            <p>
              STATUS:{' '}
              <span>{product[0].stocks > 0 ? 'Available' : 'Unavailable'}</span>
            </p>
            <p>
              CATEGORY: <span>{product[0].pcategory}</span>
            </p>
            <p>
              SIZE: <span>{product[0].psize}</span>
            </p>
            <p>
              COLOR: <span>{product[0].pcolor}</span>
            </p>
            <p>
              PRODUCT DESCIPTION: <span>{product[0].pdescript}</span>
            </p>
          </div>
        </div>
        <div className='product-view-footer'>
          <button onClick={() => setModalView(false)}>CLOSE</button>
        </div>
      </div>
    </div>
  )
}

export default ViewModalProducts
