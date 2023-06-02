import { configureStore } from '@reduxjs/toolkit'

import qualitiesReducer from './qualititesSlice'
import professionsReducer from './professionsSlice'
import usersReducer from './usersSlice'

const createStore = () => {
	return configureStore({
		reducer: {
			qualities: qualitiesReducer,
			professions: professionsReducer,
			users: usersReducer,
		},
	})
}

export default createStore
