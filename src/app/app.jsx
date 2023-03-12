import React from 'react'
import NavBar from './components/NavBar'
import Users from './layouts/Users'
import { Switch, Route } from 'react-router-dom'
import Main from './layouts/Main'
import Login from './layouts/Login'
import UserPage from './components/UserPage'
function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users/:userId" component={UserPage} />
        <Route path="/users" component={Users} />
      </Switch>
    </>
  )
}

export default App
