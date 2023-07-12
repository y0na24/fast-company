import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import Quality from './Quality'

import {
	getQualitiesByIds,
	getQualitiesLoadingStatus,
	loadQualitiesList,
} from '../../../store/qualititesSlice'

const QualitiesList = ({ qualities }) => {
	const dispatch = useDispatch()
	const isLoading = useSelector(getQualitiesLoadingStatus())
	const qualititesList = useSelector(getQualitiesByIds(qualities))

	React.useEffect(() => {
		dispatch(loadQualitiesList())
	}, [])

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
