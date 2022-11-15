/* eslint-disable react/prop-types */
import React from 'react'
import '../../css/deletemodalproducts.css'
const DeleteModalProducts = ({
  closeDeleteModal,
  submitDelete,
  delID,
  productName,
}) => {
  return (
    <div className='modal-product-delete'>
      <div className='modal-content-product-delete'>
        <div className='head-delete-products'>
          <span onClick={closeDeleteModal}>✖</span>
        </div>
        <div className='body-delete-products'>
          <h3>Are you sure you want to delete {productName} ?</h3>
        </div>
        <div className='button-delete-products'>
          <button onClick={() => submitDelete(delID)}>DELETE</button>
          <button onClick={closeDeleteModal}>CANCEL</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModalProducts
