/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react'
import '../../css/editmodaluser.css'
import '../../css/adduser.css'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const EditModalUser = ({ closeEditModal, id, setReload, reload }) => {
  const navigate = useNavigate()
  const [disable, setDisable] = useState(false)
  const [openPassword, setOpenPassword] = useState(false)
  const [passErrMsg, setPassErrMsg] = useState('')
  const [contactErrMsg, setContactErrMsg] = useState('')
  const [user, setUser] = useState({
    name: '',
    username: '',
    password: null,
    contact: '',
    email: '',
    role: '',
    status: '',
  })

  const handleCheckPassword = (e) => {
    if (e.target.checked) {
      setOpenPassword(true)
    } else {
      setOpenPassword(false)
      setPassErrMsg('')
      setDisable(false)
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users/get/${id}`)
      const data = response.data[0]

      setUser({
        ...user,
        name: data.name,
        username: data.username,
        password: '',
        contact: data.contact,
        email: data.email,
        role: data.role,
        status: data.status,
      })
    }

    fetchUser()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prev) => {
      return { ...prev, [name]: value }
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(`/users/updateuser/${id}`, user, {
        headers: { 'Content-Type': 'application/json' },
      })
      setReload(!reload)
      closeEditModal()
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
    <div className='modal-edit-user'>
      <div className='modal-content-edit-user'>
        <div className='exit-edit'>
          <span onClick={closeEditModal}>✖</span>
        </div>
        <h3>EDIT USER</h3>
        <form className='adduserform' onSubmit={handleSubmit}>
          <div className='add-user-body'>
            <div>
              <label htmlFor='name'>NAME</label>
              <input
                type='text'
                name='name'
                required
                defaultValue={user.name}
                onChange={handleChange}
              />
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
            <div className='user-lower-form input-long'>
              <label htmlFor='email'>EMAIL</label>
              <input
                type='email'
                name='email'
                className='large-input'
                defaultValue={user.email}
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
                defaultValue={user.contact}
                ref={contactRef}
                required
              />
              <label htmlFor='username'>USERNAME</label>
              <input
                type='text'
                className='large-input'
                name='username'
                defaultValue={user.username}
                onChange={handleChange}
                required
              />
              <label htmlFor='check'>Do you want to change the password?</label>
              <input
                type='checkbox'
                className='check'
                onChange={handleCheckPassword}
              />
              {openPassword && (
                <>
                  {passErrMsg === '' ? (
                    ''
                  ) : (
                    <p className='pass-error'>{passErrMsg}</p>
                  )}
                  <label htmlFor='password'>NEW PASSWORD</label>
                  <input
                    type='password'
                    className='large-input'
                    name='password'
                    onChange={validatePassword}
                    required
                    ref={passRef}
                  />
                </>
              )}
            </div>
          </div>
          <div className='add-user-footer'>
            {disable ? (
              <button className='btn' disabled>
                EDIT
              </button>
            ) : (
              <button className='btn'>EDIT</button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditModalUser
