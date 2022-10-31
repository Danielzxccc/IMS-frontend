import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/authContext'
const SidebarItems = ({ item }) => {
  const [open, setOpen] = useState(false)

  const { userData } = UserAuth()
  let navigate = useNavigate()
  const filterrole = userData.role
  if (
    filterrole === item.role[0].role1 ||
    filterrole === item.role[0].role2 ||
    filterrole === item.role[0].role3
  ) {
    if (item.childrens) {
      return (
        <div className={open ? 'sidebar-item open' : 'sidebar-item'}>
          <div className='sidebar-title'>
            <span>
              {item.icon && <i className={item.icon}></i>}
              {item.title}
            </span>
            <i
              className='bi-chevron-down toggle-btn'
              onClick={() => setOpen(!open)}
            ></i>
          </div>
          <div className='sidebar-content'>
            {item.childrens.map((child, index) => (
              <SidebarItems
                key={index}
                item={child}
                onClick={(e) => {
                  e.preventDefault()
                  navigate(`${item.childrens.path}`)
                }}
              />
            ))}
          </div>
        </div>
      )
    } else {
      return (
        <div
          className={open ? 'sidebar-item open' : 'sidebar-item'}
          onClick={(e) => {
            e.preventDefault()
            navigate(`${item.path}`)
          }}
        >
          <div className='sidebar-title'>
            <span>
              {item.icon && <i className={item.icon}></i>}
              {item.title}
            </span>
          </div>
        </div>
      )
    }
  } else {
    return <></>
  }
}
export default SidebarItems
