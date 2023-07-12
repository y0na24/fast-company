import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import {
	getProfessionById,
	getProfessionsLoadingStatus,
} from '../../store/professionsSlice'

const Profession = ({ id }) => {
	const isLoading = useSelector(getProfessionsLoadingStatus())
	const profession = useSelector(getProfessionById(id))

	return !isLoading ? <p>{profession.name}</p> : 'Loading...'
}

Profession.propTypes = {
	id: PropTypes.string,
}

export default Profession
