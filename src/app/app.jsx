import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Users from './layouts/Users'
import Main from './layouts/Main'
import Login from './layouts/Login'
import NavBar from './components/ui/NavBar'
import ProtectedRoute from './components/common/ProtectedRoute'
import LogOut from './layouts/LogOut'

import { ProfessionProvider } from './hooks/useProfession'
import AuthProvider from './hooks/useAuth'

import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { loadQualitiesList } from './store/qualititesSlice'

function App() {
	const dispatch = useDispatch()

	React.useEffect(() => {
		dispatch(loadQualitiesList())
	}, [])

	return (
		<>
			<AuthProvider>
				<NavBar />
				<ProfessionProvider>
					<Switch>
						<Route exact path='/' component={Main} />
						<Route path='/login/:type?' component={Login} />
						<Route path='/logout' component={LogOut} />
						<ProtectedRoute path='/users/:userId?/:edit?' component={Users} />
						<Redirect to='/' />
					</Switch>
				</ProfessionProvider>
			</AuthProvider>
			<ToastContainer />
		</>
	)
}

export default App
