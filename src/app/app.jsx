import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import AppLoader from './components/ui/hoc/AppLoader'
import Users from './layouts/Users'
import Main from './layouts/Main'
import Login from './layouts/Login'
import NavBar from './components/ui/NavBar'
import ProtectedRoute from './components/common/ProtectedRoute'
import LogOut from './layouts/LogOut'

import 'react-toastify/dist/ReactToastify.css'

function App() {
	return (
		<>
			<AppLoader>
					<NavBar />
					<Switch>
						<Route exact path='/' component={Main} />
						<Route path='/login/:type?' component={Login} />
						<Route path='/logout' component={LogOut} />
						<ProtectedRoute path='/users/:userId?/:edit?' component={Users} />
						<Redirect to='/' />
					</Switch>
				<ToastContainer />
			</AppLoader>
		</>
	)
}

export default App
