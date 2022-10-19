import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './components/Dashboard'

import Unauthorize from './components/Unauthorize'
import Login from './components/Login'
import PersistLogin from './components/PersistLogin'

const ROLES = {
  Employee: 'Employee',
  ReportStaff: 'ReportStaff',
  Admin: 'Admin',
}

function App() {
  return (
    <Router>
      <Routes>
        {/* protected routes */}
        <Route element={<PersistLogin />}>
          <Route
            element={
              <PrivateRoute
                allowedRoles={[ROLES.Employee, ROLES.ReportStaff, ROLES.Admin]}
              />
            }
          >
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/unauthorize' element={<Unauthorize />} />
          </Route>
        </Route>

        <Route path='/' element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
