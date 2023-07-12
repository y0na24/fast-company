import { configureStore } from '@reduxjs/toolkit'

import qualitiesReducer from './qualititesSlice'
import professionsReducer from './professionsSlice'
import usersReducer from './usersSlice'
import commentsReducer from './commentsSlice'

const createStore = () => {
	return configureStore({
		reducer: {
			qualities: qualitiesReducer,
			professions: professionsReducer,
			users: usersReducer,
			comments: commentsReducer,
		},
	})
}

export default createStore
