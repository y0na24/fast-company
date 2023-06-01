import { configureStore } from '@reduxjs/toolkit'
import qualitiesReducer from './qualititesSlice'

const createStore = () => {
	return configureStore({
		reducer: { qualities: qualitiesReducer },
	})
}

export default createStore
