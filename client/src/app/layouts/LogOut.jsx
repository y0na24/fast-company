import React from 'react'
import { useDispatch } from 'react-redux'

import { logOut } from '../store/usersSlice'

const LogOut = () => {
	const dispatch = useDispatch()

	React.useEffect(() => {
		dispatch(logOut())
	}, [])

	return <h1>Loading</h1>
}

export default LogOut
