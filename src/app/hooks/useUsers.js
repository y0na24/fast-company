import React from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

import userService from '../services/user.service'
import { useAuth } from './useAuth'

const UserContext = React.createContext()

export const useUser = () => {
	return React.useContext(UserContext)
}

const UserProvider = ({ children }) => {
	const [users, setUsers] = React.useState([])
	const { currentUser } = useAuth()
	const [isLoading, setIsLoading] = React.useState(true)
	const [error, setError] = React.useState(null)

	React.useEffect(() => {
		if (error !== null) {
			toast.error(error)
			setError(null)
		}
	}, [error])

	const getUsers = async () => {
		try {
			const { content } = await userService.get()
			setUsers(content)
			setIsLoading(false)
		} catch (error) {
			errorCatcher(error)
		}
	}

	React.useState(() => {
		getUsers()
	}, [])

	React.useEffect(() => {
		if (!isLoading) {
			const newUsers = [...users]
			const userIndex = newUsers.findIndex(u => u._id === currentUser._id)
			newUsers[userIndex] = currentUser
			setUsers(newUsers)
		}
	}, [currentUser])

	const getUserById = userId => {
		return users.find(user => user._id === userId)
	}

	const errorCatcher = error => {
		const { message } = error.response.data
		setError(message)
	}

	return (
		<UserContext.Provider value={{ users, getUserById }}>
			{!isLoading ? children : <h1>Users loading...</h1>}
		</UserContext.Provider>
	)
}

UserProvider.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
}

export default UserProvider
