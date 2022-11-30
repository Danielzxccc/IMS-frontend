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

const ROLES = {
  Employee: 'Employee',
  ReportStaff: 'ReportStaff',
  Admin: 'Admin',
}

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* protected routes */}
          <Route element={<PersistLogin />}>
            <Route
              element={
                <PrivateRoute
                  allowedRoles={[
                    ROLES.Employee,
                    ROLES.ReportStaff,
                    ROLES.Admin,
                  ]}
                />
              }
            >
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/manageproducts' element={<Products />} />
              <Route path='/archiveproducts' element={<ProductArchive />} />
              <Route path='/reports' element={<Reports />} />
              <Route path='/paidorders' element={<PaidOrders />} />
              <Route path='/adduser' element={<AddUser />} />
              <Route path='/manageuser' element={<ManageUsers />} />
            </Route>
            <Route path='/unauthorize' element={<Unauthorize />} />
            <Route path='/stores' element={<Stores />} />
          </Route>
          <Route path='/' element={<Login />} />
          <Route path='/*' element={<MissingPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
