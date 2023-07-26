import React from 'react'
import PropTypes from 'prop-types'

import {
	getIsLoggedIn,
	getUsersLoadingStatus,
	loadUsersList,
} from '../../../store/usersSlice'
import { useDispatch, useSelector } from 'react-redux'
import { loadQualitiesList } from '../../../store/qualititesSlice'
import { loadProfessionsList } from '../../../store/professionsSlice'

const AppLoader = ({ children }) => {
	const dispatch = useDispatch()
	const isLoggedIn = useSelector(getIsLoggedIn())
	const usersStatus = useSelector(getUsersLoadingStatus())

	React.useEffect(() => {
		dispatch(loadQualitiesList())
		dispatch(loadProfessionsList())

		if (isLoggedIn) {
			dispatch(loadUsersList())
		}
	}, [isLoggedIn])

	return usersStatus ? <h2>Loading...</h2> : children
}

AppLoader.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
}

export default AppLoader
