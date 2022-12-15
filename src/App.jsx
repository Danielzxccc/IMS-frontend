import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './components/Dashboard'
import Unauthorize from './components/Unauthorize'
import Login from './components/Login'
import PersistLogin from './components/PersistLogin'
import MissingPage from './components/pages/MissingPage'
import Products from './components/Products'
import PaidOrders from './components/PaidOrders'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Reports from './components/Reports'
import ProductArchive from './components/archives/ProductArchive'
import Stores from './components/Stores'
import AddUser from './components/users/AddUser'
import ManageUsers from './components/users/ManageUsers'
import UserArchives from './components/archives/UserArchives'
import ProductReports from './components/reports/ProductReports'
import GenerateProductReport from './components/reports/GenerateProductReport'
import SalesReports from './components/reports/SalesReports'
import Logout from './components/actions/Logout'
import Profile from './components/Profile'
import { useReducer } from 'react'
import { ToastContainer } from 'react-toastify'

const ROLES = {
  Employee: 'Employee',
  Admin: 'Admin',
}

const queryClient = new QueryClient()

function reducer(state, action) {
  if (action.type === 'emitNotif') {
    return action.payload
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { data: null })
  // const navigate = useNavigate()
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* protected routes */}
          {/* admin and employee */}
          <Route element={<PersistLogin />}>
            <Route
              element={
                <PrivateRoute allowedRoles={[ROLES.Employee, ROLES.Admin]} />
              }
            >
              <Route
                path='/dashboard'
                element={<Dashboard state={state} dispatch={dispatch} />}
              />
              <Route path='/manageproducts' element={<Products />} />
              <Route path='/salesreports' element={<Reports />} />
              <Route path='/productreports' element={<ProductReports />} />
              <Route
                path='/productreports/generate'
                element={<GenerateProductReport />}
              />
              <Route path='/salesreports/generate' element={<SalesReports />} />
              <Route
                path='/paidorders'
                element={<PaidOrders dispatch={dispatch} />}
              />
            </Route>
            {/* admin only access */}
            <Route element={<PrivateRoute allowedRoles={[ROLES.Admin]} />}>
              <Route path='/archiveproducts' element={<ProductArchive />} />
              <Route path='/archiveusers' element={<UserArchives />} />
              <Route path='/adduser' element={<AddUser />} />
              <Route path='/manageuser' element={<ManageUsers />} />
            </Route>

            <Route path='/unauthorize' element={<Unauthorize />} />
            <Route path='/stores' element={<Stores />} />
            <Route path='/viewprofile' element={<Profile />} />
            <Route path='/logout' element={<Logout />} />
          </Route>
          <Route path='/' element={<Login />} />
          <Route path='/*' element={<MissingPage />} />
        </Routes>
      </Router>
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
        onClick={() => (window.location.href = '/manageproducts')}
      />
    </QueryClientProvider>
  )
}

export default App
