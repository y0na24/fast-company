import React from 'react'
import NavBar from './components/NavBar'
import Users from './layouts/Users'
import { Switch, Route, Redirect } from 'react-router-dom'
import Main from './layouts/Main'
import Login from './layouts/Login'

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users/:userId?" component={Users} />
        <Redirect to="/" />
      </Switch>
    </>
  )
}

export default App
