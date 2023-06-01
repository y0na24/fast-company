import { createSlice } from '@reduxjs/toolkit'

import professionService from '../services/profession.service'

const professionsSlice = createSlice({
	name: 'professions',
	initialState: {
		entites: null,
		isLoading: true,
		error: null,
		lastFetch: null,
	},
	reducers: {
		professionsRequested(state) {
			state.isLoading = true
		},
		professionsReceived(state, action) {
			state.entites = action.payload
			state.isLoading = false
		},
		professionsRequestFailed(state, action) {
			state.error = action.payload
			state.isLoading = false
		},
	},
})

const { reducer: professionsReducer, actions } = professionsSlice
const { professionsReceived, professionsRequested, professionsRequestFailed } =
	actions

export const loadProfessionsList = () => async (dispatch, getState) => {
	dispatch(professionsRequested())

	try {
		const { content } = await professionService.get()
		dispatch(professionsReceived(content))
	} catch (error) {
		dispatch(professionsRequestFailed(error.message))
	}
}
export const getProfessionById = id => state => {
	const professions = state.professions.entites
	return professions.find(p => p._id === id)
}

export const getProfessions = () => state => state.professions.entites
export const getProfessionsLoadingStatus = () => state =>
	state.professions.isLoading

export default professionsReducer
