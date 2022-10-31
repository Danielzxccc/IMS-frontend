import { UserAuth } from '../context/authContext'
import Sidebar from './Sidebar'
import '../css/dashboard.css'

const Dashboard = () => {
  const { userData } = UserAuth()
  return (
    <div className='wrapper'>
      <Sidebar />
      <div className='main-container'>
        {/* HEADER */}
        <div className='head-dashboard'>
          <div className='overview'>
            <h1>OVERVIEW</h1>
          </div>
          <div className='admin-avatar'>
            <p className='welcome'>
              Welcome, {userData.role} {userData.name}
            </p>
          </div>
        </div>

        {/* GRAPHS SPACING */}
        <div className='graph-container'>
          <div className='left-side'>
            <div className='box-1'>box1</div>
            <div className='box-2'>box2</div>
          </div>
          <div className='right-side'>
            <div className='box-3'>box3</div>
            <div className='box-4'>
              <div className='overlay'>lalo</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
