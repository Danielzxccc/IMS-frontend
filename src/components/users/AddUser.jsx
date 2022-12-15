import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import '../../css/adduser.css'
import Header from '../header/Header'
import Sidebar from '../Sidebar'
import { useRef } from 'react'

const AddUser = () => {
  const navigate = useNavigate()
  const [disable, setDisable] = useState(false)
  const [passErrMsg, setPassErrMsg] = useState('')
  const [contactErrMsg, setContactErrMsg] = useState('')
  const [user, setUser] = useState({
    name: '',
    username: '',
    password: '',
    contact: '',
    email: '',
    role: '',
    status: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prev) => {
      return { ...prev, [name]: value }
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/users/create', user, {
        headers: { 'Content-Type': 'application/json' },
      })
      console.log(response)
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
      setDisable(true)
      setTimeout(() => {
        navigate('/manageuser')
      }, 3000)
    } catch (error) {
      console.log(error)
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
  const passRef = useRef()
  const contactRef = useRef()
  const validatePassword = (e) => {
    setUser({ ...user, password: e.target.value })
    const regex =
      /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}).*$/g

    if (!regex.test(passRef.current.value)) {
      setPassErrMsg('Password is too weak')
      setDisable(true)
    } else {
      setPassErrMsg('')
      setDisable(false)
    }
  }

  const validateNumber = (e) => {
    setUser({ ...user, contact: e.target.value })
    const regexContact = /^(09|\+639)\d{9}$/gm

    if (!regexContact.test(contactRef.current.value)) {
      setContactErrMsg('Invalid contact number')
      setDisable(true)
    } else {
      setContactErrMsg('')
      setDisable(false)
    }
  }

  return (
    <section id='dashboard'>
      <nav>
        <Sidebar />
      </nav>
      <header>
        <Header title={'ADD USER'} />
      </header>
      <main>
        <form className='adduserform' onSubmit={handleSubmit}>
          <div className='add-user-body'>
            <div>
              <label htmlFor='name'>NAME</label>
              <input type='text' name='name' required onChange={handleChange} />
              <label htmlFor='ROLE'>ROLE</label>
              <div className='d-flex'>
                <input
                  type='radio'
                  name='role'
                  value='Admin'
                  onChange={handleChange}
                  required
                />
                <label htmlFor='role'>ADMINISTRATOR</label>
              </div>
              <div className='d-flex'>
                <input
                  type='radio'
                  name='role'
                  value='Employee'
                  onChange={handleChange}
                  required
                />
                <label htmlFor='role'>EMPLOYEE</label>
              </div>
              {/* <div className='d-flex'>
                <input
                  type='radio'
                  name='role'
                  value='ReportStaff'
                  onChange={handleChange}
                  required
                />
                <label htmlFor='role'>REPORT STAFF</label>
              </div> */}
            </div>
            <div>
              <label htmlFor='status' className='user-status'>
                STATUS
              </label>
              <br />
              <div className='d-flex'>
                <input
                  type='radio'
                  name='status'
                  value='Active'
                  onChange={handleChange}
                  required
                />
                <label htmlFor='status'>ACTIVE</label>
              </div>
              <div className='d-flex'>
                <input
                  type='radio'
                  name='status'
                  value='Inactive'
                  onChange={handleChange}
                  required
                />
                <label htmlFor='status'>INACTIVE</label>
              </div>
            </div>
          </div>
          <div className='add-user-body'>
            <div className='user-lower-form'>
              <label htmlFor='email'>EMAIL</label>
              <input
                type='email'
                name='email'
                className='large-input'
                onChange={handleChange}
                required
              />
              <label htmlFor='contact'>CONTACT NO.</label>
              {contactErrMsg === '' ? (
                ''
              ) : (
                <p className='pass-error'>{contactErrMsg}</p>
              )}
              <input
                type='text'
                className='large-input'
                name='contact'
                onChange={validateNumber}
                ref={contactRef}
                required
              />
              <label htmlFor='username'>USERNAME</label>
              <input
                type='text'
                className='large-input'
                name='username'
                onChange={handleChange}
                required
              />
              <label htmlFor='password'>PASSWORD</label>
              {passErrMsg === '' ? (
                ''
              ) : (
                <p className='pass-error'>{passErrMsg}</p>
              )}
              <input
                type='password'
                className='large-input'
                name='password'
                onChange={validatePassword}
                required
                ref={passRef}
              />
            </div>
          </div>
          <div className='add-user-footer'>
            {disable ? (
              <button className='btn' disabled>
                ADD
              </button>
            ) : (
              <button className='btn'>ADD</button>
            )}
          </div>
        </form>
      </main>
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

export default AddUser
