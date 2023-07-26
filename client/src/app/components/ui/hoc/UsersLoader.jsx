import React from 'react'
import PropTypes from 'prop-types'

import { getDataStatus, loadUsersList } from '../../../store/usersSlice'
import { useDispatch, useSelector } from 'react-redux'

const UsersLoader = ({ children }) => {
	const dispatch = useDispatch()
	const dataStatus = useSelector(getDataStatus())

	React.useEffect(() => {
		if (!dataStatus) {
			dispatch(loadUsersList())
		}
	}, [])

	return !dataStatus ? <h2>Loading...</h2> : children
}

UsersLoader.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
}

export default UsersLoader
