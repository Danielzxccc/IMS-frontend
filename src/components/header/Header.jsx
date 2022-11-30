/* eslint-disable react/prop-types */
import React from 'react'
import '../../css/header.css'

const Header = ({ title }) => {
  return (
    <div className='header'>
      <h1>{title}</h1>
    </div>
  )
}

export default Header
