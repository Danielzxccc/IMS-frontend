/* eslint-disable react/prop-types */
import React from 'react'
import '../../css/deletemodaluser.css'
const DeleteModalUser = ({ username, closeDeleteModal, archiveUser }) => {
  return (
    <div className='modal-delete-user'>
      <div className='modal-content-delete-user'>
        <div className='head-delete-user'>
          <span onClick={closeDeleteModal}>✖</span>
        </div>
        <div className='body-delete-user'>
          <h3>Are you sure you want to delete {username}?</h3>
        </div>
        <div className='delete-user-buttons'>
          <button onClick={archiveUser}>DELETE</button>
          <button onClick={closeDeleteModal}>CANCEL</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModalUser
