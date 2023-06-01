import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import Quality from './Quality'

import {
	getQualitiesByIds,
	getQualitiesLoadingStatus,
} from '../../../store/qualititesSlice'

const QualitiesList = ({ qualities }) => {
	const isLoading = useSelector(getQualitiesLoadingStatus())
	const qualititesList = useSelector(getQualitiesByIds(qualities))

	if (isLoading) return '...Loading'

	return (
		<>
			{qualititesList.map(qual => (
				<Quality key={qual._id} {...qual} />
			))}
		</>
	)
}

QualitiesList.propTypes = {
	qualities: PropTypes.array.isRequired,
}

export default QualitiesList
