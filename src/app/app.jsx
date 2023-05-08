import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Users from './layouts/Users'
import Main from './layouts/Main'
import Login from './layouts/Login'
import NavBar from './components/ui/NavBar'

import { ProfessionProvider } from './hooks/useProfession'
import { QualityProvider } from './hooks/useQualities'
import AuthProvider from './hooks/useAuth'

import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <ProfessionProvider>
          <QualityProvider>
            <Switch>
              <Route exact path='/' component={Main} />
              <Route path='/login/:type?' component={Login} />
              <Route path='/users/:userId?/:edit?' component={Users} />
              <Redirect to='/' />
            </Switch>
          </QualityProvider>
        </ProfessionProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  )
}

export default App
