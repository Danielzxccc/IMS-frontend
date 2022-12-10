import React, { useState } from 'react'
import Header from '../header/Header'
import Sidebar from '../Sidebar'
import '../../css/archiveproducts.css'
import UserArchiveTable from '../tables/UserArchiveTable'
import MultipleUnarchiveModal from '../actions/MultipleUnarchiveModal'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
const UserArchives = () => {
  const [checkedValues, setCheckedValues] = useState([])
  const [confirmation, setConfirmation] = useState(false)
  const [reload, setReload] = useState(false)
  const handleCheckChange = (e) => {
    const { value, checked } = e.target
    // Case 1 : The user checks the box
    if (checked) {
      setCheckedValues([...checkedValues, value])
    } else {
      setCheckedValues(checkedValues.filter((e) => e !== value))
    }
  }
  const multipleUnarchive = async () => {
    try {
      if (checkedValues.length) {
        const response = await axios.put('/users/multiplearchive', {
          users: checkedValues,
        })
        if (response) setReload(!reload)
        setConfirmation(false)
        toast.success('Unarchived Successfully', {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
      } else {
        toast.error('no user selected', {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
        setConfirmation(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <section id='dashboard'>
      <nav>
        <Sidebar />
      </nav>
      <header>
        <Header title={'ARCHIVED USERS'} />
      </header>
      <main>
        <div className='archive-body'>
          <div className='select-all'>
            <p onClick={() => setConfirmation(true)}>Unarchive</p>
          </div>
          <div className='archive-table'>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>USER ID</th>
                  <th>NAME</th>
                  <th>ROLE</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                <UserArchiveTable
                  handleCheckChange={handleCheckChange}
                  reload={reload}
                />
              </tbody>
            </table>
          </div>
        </div>
      </main>
      {confirmation ? (
        <MultipleUnarchiveModal
          setConfirmation={setConfirmation}
          multipleUnarchive={multipleUnarchive}
        />
      ) : (
        <></>
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

export default UserArchives
