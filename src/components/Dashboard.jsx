import { UserAuth } from '../context/authContext'
import '../css/dashboard.css'
const Dashboard = () => {
  const { userData } = UserAuth()
  return <div>Dashboard</div>
}

export default Dashboard
