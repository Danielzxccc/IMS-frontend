import React from 'react'
import SidebarItems from './SidebarItems'
import items from '../data/sidebar.json'
import logo from '../assets/logo-white.png'
import '../css/sidebar.css'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='logo-sidebar'>
        <img src={logo} />
      </div>
      {items.map((item, index) => (
        <SidebarItems key={index} item={item} />
      ))}
    </div>
  )
}

export default Sidebar
