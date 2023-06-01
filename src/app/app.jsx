import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Users from './layouts/Users'
import Main from './layouts/Main'
import Login from './layouts/Login'
import NavBar from './components/ui/NavBar'
import ProtectedRoute from './components/common/ProtectedRoute'
import LogOut from './layouts/LogOut'

import AuthProvider from './hooks/useAuth'

import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { loadQualitiesList } from './store/qualititesSlice'
import { loadProfessionsList } from './store/professionsSlice'

function App() {
	const dispatch = useDispatch()

	React.useEffect(() => {
		dispatch(loadQualitiesList())
		dispatch(loadProfessionsList())
	}, [])

	return (
		<>
			<AuthProvider>
				<NavBar />
				<Switch>
					<Route exact path='/' component={Main} />
					<Route path='/login/:type?' component={Login} />
					<Route path='/logout' component={LogOut} />
					<ProtectedRoute path='/users/:userId?/:edit?' component={Users} />
					<Redirect to='/' />
				</Switch>
			</AuthProvider>
			<ToastContainer />
		</>
	)
}

export default App
