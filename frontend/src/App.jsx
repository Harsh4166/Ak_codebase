import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// client imports
import Client from './Client/indexClient'
import ClientAuth from './Client/auth/clientAuth'
import ClientRegstration from './Client/auth/clientRegstration'
import { AuthProvider } from './Client/auth/AuthContext'
// import { UserDataProvider } from './Client/auth/dataContext'

// admin Imports
import Admin from './Admin/indexAdmin'
import AdminAuth from './Admin/auth/adminAuth'
import AuthAdminRoute from './Admin/auth/authRouts'
import ProtectedAdminRoute from './Admin/auth/ProtectedRoute'

// Employee imports
import Employee from './Employee/indexEmployee'
import EmployeeAuth from './Employee/auth/employeeAuth'
import AuthEmployeeRoute from './Employee/auth/authRouts'
import ProtectedEmployeeRoute from './Employee/auth/ProtectedRoute'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/*'
            element={
              <AuthProvider>
                {/* <UserDataProvider> */}
                <Client />
                {/* </UserDataProvider> */}
              </AuthProvider>
            } />
          <Route path='/clientAuth' element={<AuthProvider><ClientAuth /></AuthProvider>} />
          <Route path='/clientRegs' element={<ClientRegstration />} />

          {/* admin entery */}
          <Route path='/admin/*' element={<ProtectedAdminRoute><Admin /></ProtectedAdminRoute>} />
          <Route path='/adminAuth' element={<AuthAdminRoute><AdminAuth /></AuthAdminRoute>} />

          {/* employee */}
          <Route path='/employee/*' element={<ProtectedEmployeeRoute><Employee /></ProtectedEmployeeRoute>} />
          <Route path='/employeeAuth' element={<AuthEmployeeRoute><EmployeeAuth /></AuthEmployeeRoute>} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App