import React from 'react'
import NavBar from './components/ui/NavBar'
import Users from './layouts/Users'
import { Switch, Route, Redirect } from 'react-router-dom'
import Main from './layouts/Main'
import Login from './layouts/Login'
import { ToastContainer } from 'react-toastify'
import { ProfessionProvider } from './hooks/useProfession'

import 'react-toastify/dist/ReactToastify.css'
import { QualityProvider } from './hooks/useQualities'

function App() {
  return (
    <>
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
      <ToastContainer />
    </>
  )
}

export default App
