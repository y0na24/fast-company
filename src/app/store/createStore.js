import { configureStore } from '@reduxjs/toolkit'
import qualitiesReducer from './qualititesSlice'
import professionsReducer from './professionsSlice'

const createStore = () => {
	return configureStore({
		reducer: { qualities: qualitiesReducer, professions: professionsReducer },
	})
}

export default createStore
