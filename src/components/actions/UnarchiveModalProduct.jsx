/* eslint-disable react/prop-types */
import React from 'react'
import '../../css/archivemodalproduct.css'
const UnarchiveModalProduct = ({
  setOpenModal,
  unarchiveProduct,
  proID,
  productName,
}) => {
  return (
    <div className='modal-product-archive'>
      <div className='modal-content-product-archive'>
        <div className='modal-archive-product-body'>
          Are you sure you want to unarchive {productName} ?
        </div>
        <div className='modal-archive-product-footer'>
          <button onClick={() => unarchiveProduct(proID)}>YES</button>
          <button onClick={() => setOpenModal(false)}> CANCEL</button>
        </div>
      </div>
    </div>
  )
}

export default UnarchiveModalProduct
