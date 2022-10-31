import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../Sidebar'

const MissingPage = () => {
  return (
    <div className='wrapper'>
      <div className='main-container'>
        <h1>MISSING PAGE</h1>
        <Link to='/dashboard'>Back</Link>
      </div>
      <Sidebar />
    </div>
  )
}

export default MissingPage
