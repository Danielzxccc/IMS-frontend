import React from 'react'
import Header from '../header/Header'
import Sidebar from '../Sidebar'
import '../../css/manageusers.css'
import UsersTable from '../tables/UsersTable'
import { useState } from 'react'
import DeleteModalUser from '../actions/DeleteModalUser'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import EditModalUser from '../actions/EditModalUser'

const ManageUsers = () => {
  const [query, setQuery] = useState('')
  const [openDelete, setOpenDelete] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [id, setID] = useState(0)
  const [username, setUsername] = useState('')
  const [reload, setReload] = useState(false)

  const openDeleteModal = (id, username) => {
    setID(id)
    setUsername(username)
    setOpenDelete(true)
  }

  const closeDeleteModal = () => {
    setOpenDelete(false)
  }

  const openEditModal = (id) => {
    setID(id)
    setOpenEdit(true)
  }

  const closeEditModal = () => {
    setOpenEdit(false)
  }

  const archiveUser = async () => {
    try {
      const response = await axios.put(`/users/archiveuser/${id}`)
      setOpenDelete(false)
      setReload(!reload)
      toast.success(`${response?.data?.message}`, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    } catch (error) {
      toast.error(`${error?.response?.data?.message}`, {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    }
  }
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
              <UsersTable
                query={query}
                openDeleteModal={openDeleteModal}
                openEditModal={openEditModal}
                reload={reload}
              />
            </tbody>
          </table>
        </div>
      </main>
      {openDelete && (
        <DeleteModalUser
          username={username}
          archiveUser={archiveUser}
          closeDeleteModal={closeDeleteModal}
        />
      )}
      {openEdit && (
        <EditModalUser
          closeEditModal={closeEditModal}
          id={id}
          setReload={setReload}
          reload={reload}
        />
      )}
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </section>
  )
}

export default ManageUsers
