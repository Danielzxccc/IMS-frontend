import { UserAuth } from '../context/authContext'
import Sidebar from './Sidebar'
import '../css/dashboard.css'

const Dashboard = () => {
  const { userData } = UserAuth()
  return (
    <section id='dashboard'>
      <nav>
        <Sidebar />
        test
      </nav>

      {/* HEADER */}
      <header>test header</header>

      <main></main>

      {/* GRAPHS SPACING */}
    </section>
  )
}

export default Dashboard
