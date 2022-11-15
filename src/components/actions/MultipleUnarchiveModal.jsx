/* eslint-disable react/prop-types */
import React from 'react'
import '../../css/archivemodalproduct.css'
const MultipleUnarchiveModal = ({ multipleUnarchive, setConfirmation }) => {
  return (
    <div className='modal-product-archive'>
      <div className='modal-content-product-archive'>
        <div className='modal-archive-product-body'>
          Are you sure you want to unarchive multiple products ?
        </div>
        <div className='modal-archive-product-footer'>
          <button onClick={multipleUnarchive}>YES</button>
          <button onClick={() => setConfirmation(false)}> CANCEL</button>
        </div>
      </div>
    </div>
  )
}

export default MultipleUnarchiveModal
