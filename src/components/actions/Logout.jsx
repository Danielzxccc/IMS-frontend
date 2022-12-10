import React from 'react'
import Sidebar from '../Sidebar'
import '../../css/logout.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Logout = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    const logout = await axios.delete('/auth/logout')
    if (logout) navigate('/')
  }

  const handleCancel = () => {
    navigate(-1)
  }
  return (
    <section id='dashboard'>
      <nav>
        <Sidebar />
      </nav>
      <header></header>
      <main>
        <div className='logout-modal'>
          <div className='logout-modal-content'>
            <div className='logout-modal-header'>
              <span onClick={handleCancel}>✖</span>
            </div>
            <div className='logout-modal-body'>
              <span>Are you sure you want to logout your account?</span>
            </div>
            <div className='logout-modal-footer'>
              <button className='btn-logout' onClick={handleLogout}>
                Yes
              </button>
              <button className='btn-logout cancel' onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </main>
    </section>
  )
}

export default Logout
