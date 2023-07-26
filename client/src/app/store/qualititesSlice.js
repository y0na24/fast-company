import { createSlice } from '@reduxjs/toolkit'

import qualitiesService from '../services/qualities.service'

const qualitiesSlice = createSlice({
	name: 'qualities',
	initialState: {
		entities: null,
		isLoading: true,
		error: null,
		lastFetch: null,
	},
	reducers: {
		qualitiesRequested(state) {
			state.isLoading = true
		},
		qualitiesReceived(state, action) {
			state.entities = action.payload
			state.lastFetch = Date.now()
			state.isLoading = false
		},
		qualitiesRequestFailed(state, action) {
			state.error = action.payload
			state.isLoading = false
		},
	},
})

const { reducer: qualitiesReducer, actions } = qualitiesSlice
const { qualitiesReceived, qualitiesRequestFailed, qualitiesRequested } =
	actions

const isOutdated = date => {
	return Date.now() - date > 10 * 60 * 1000
}

export const loadQualitiesList = () => async (dispatch, getState) => {
	const { lastFetch } = getState().qualities
	if (isOutdated(lastFetch)) {
		dispatch(qualitiesRequested())
		try {
			const { content } = await qualitiesService.get()
			dispatch(qualitiesReceived(content))
		} catch (error) {
			dispatch(qualitiesRequestFailed(error.message))
		}
	}
}

export const getQualities = () => state => state.qualities.entities

export const getQualitiesLoadingStatus = () => state =>
	state.qualities.isLoading

export const getQualitiesByIds = qualitiesIds => state => {
	if (state.qualities.entities) {
		const qualArray = []
		for (const qualId of qualitiesIds) {
			for (const qual of state.qualities.entities) {
				if (qual._id === qualId) {
					qualArray.push(qual)
					break
				}
			}
		}

		return qualArray
	}
	return []
}

export default qualitiesReducer
