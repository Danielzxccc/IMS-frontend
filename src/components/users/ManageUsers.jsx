import React, { useRef } from 'react'
import Header from '../header/Header'
import Sidebar from '../Sidebar'
import '../../css/manageusers.css'
import UsersTable from '../tables/UsersTable'
import { useState } from 'react'

const ManageUsers = () => {
  const [query, setQuery] = useState('')
  return (
    <section id='dashboard'>
      <nav>
        <Sidebar />
      </nav>
      <header>
        <Header title={'MANAGE USERS'} />
      </header>
      <main>
        <div className='search-users'>
          <div>
            <div className='user-search-inputs'>
              <span>
                <i className='bi bi-search'></i>
              </span>
              <input
                type='text'
                name='search'
                placeholder='search users'
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className='users-table'>
          <table>
            <thead>
              <tr>
                <th>USER ID</th>
                <th>NAME</th>
                <th>ROLE</th>
                <th>STATUS</th>
                <th>EMAIL</th>
                <th>CONTACT</th>
                <th>USERNAME</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <UsersTable query={query} />
            </tbody>
          </table>
        </div>
      </main>
    </section>
  )
}

export default ManageUsers
