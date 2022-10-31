import React from 'react'
import { useState } from 'react'
import '../css/login.css'
import logo from '../assets/logo1.png'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/authContext'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [disable, setDisable] = useState(false)
  const navigate = useNavigate()
  const { setUserData, setToken } = UserAuth()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        '/auth/login',
        {
          username: username,
          password: password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )

      await toast.success('Logged In Successfully', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })

      setUserData(response.data.user)
      setToken(true)
      setDisable(true)

      setTimeout(() => {
        navigate('/dashboard')
      }, 3000)
    } catch (err) {
      if (!err?.response) {
        await toast.error('No Server Response', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
      } else if (err.response?.status === 400) {
        await toast.error('Invalid Username', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
      } else if (err.response?.status === 401) {
        await toast.error('Unauthorized', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
      } else {
        await setErrMsg('Login Failed')
        toast.error('Login Failed', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
      }
    }
  }
  return (
    <div className='container'>
      <div className='logo'>
        <div className='img'>
          <img src={logo} width='140' />
        </div>
      </div>
      <h2 className='mb-5'>LOGIN</h2>
      <div className='login-form'>
        <form onSubmit={handleLogin}>
          <div className='mb-2'>
            <label>Username</label>
            <input type='text' onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className='mb-2'>
            <label>Password</label>
            <input
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='btn-parent'>
            {disable ? (
              <button className='btn' type='submit' disabled>
                ENTER
              </button>
            ) : (
              <button className='btn' type='submit'>
                ENTER
              </button>
            )}
          </div>
        </form>
      </div>
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
    </div>
  )
}

export default Login
