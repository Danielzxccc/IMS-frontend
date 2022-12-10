import React from 'react'
import Header from './header/Header'
import Sidebar from './Sidebar'
import '../css/profile.css'
import logo from '../assets/logo-white.png'
import daniel from '../assets/daniel.jpg'
import { UserAuth } from '../context/authContext'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const Profile = () => {
  const { userData } = UserAuth()
  const { isLoading, error, data } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const response = await axios.get(`/users/get/${userData?.id}`)
      return response.data[0]
    },
  })
  if (isLoading)
    return (
      <tr>
        <td colSpan={5}>loading...</td>
      </tr>
    )

  if (error)
    return (
      <tr>
        <td colSpan={5}>error...</td>
      </tr>
    )
  return (
    <section id='dashboard'>
      <nav>
        <Sidebar />
      </nav>
      <header>
        <Header title={'EMPLOYEE PROFILE'} />
      </header>
      <main>
        <div className='profileContainer'>
          <div className='profileBoxCon'>
            <div className='profilebox'>
              <div className='profilehole'>
                <div className='hole'>
                  <p>test</p>
                </div>
              </div>
              <div className='profileicons'>
                <div className='eID'>
                  <div className='dashborder'>
                    <h2>EMPLOYEE</h2>
                    <h2>IDENTIFICATION</h2>
                  </div>
                </div>
                <div className='profilelogo'>
                  <img src={logo} className='imglogopro' />
                </div>
              </div>

              <div className='profiledetails'>
                <div className='profilepic'>
                  <img src={daniel} className='imgprofile' />
                  <h2>USER ID : {data.id} </h2>
                </div>

                <div className='profiledesc'>
                  <div className='profileflex'>
                    <h2>
                      <span className='profileBlue'>Name:</span> {data.name}
                    </h2>
                  </div>
                  <div className='profileflex'>
                    <h2>
                      <span className='profileBlue'>Role:</span> {data.role}
                    </h2>
                    <h2>
                      <span className='profileBlue'>Status:</span> {data.status}
                    </h2>
                  </div>
                  <div className='profileflex'>
                    <h2>
                      <span className='profileBlue'>Email:</span> {data.email}
                    </h2>
                  </div>
                  <div className='profileflex'>
                    <h2>
                      <span className='profileBlue'>Contact Number:</span>{' '}
                      {data.contact}
                    </h2>
                  </div>
                  <div className='profileflex'>
                    <h2>
                      <span className='profileBlue'>Username:</span>{' '}
                      {data.username}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  )
}

export default Profile
