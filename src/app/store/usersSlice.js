import { createAction, createSlice } from '@reduxjs/toolkit'

import userService from '../services/user.service'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'

import getRandomInt from '../utils/getRandomInt'
import history from '../utils/history'
import generateAuthError from '../utils/generateAuthError'

const initialState = localStorageService.getAccessToken()
	? {
			entities: [],
			isLoading: true,
			error: null,
			auth: { userId: localStorageService.getUserId() },
			isLoggedIn: true,
			dataLoaded: false,
	}
	: {
			entities: [],
			isLoading: false,
			error: null,
			auth: null,
			isLoggedIn: false,
			dataLoaded: false,
	}

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		usersRequested(state) {
			state.isLoading = true
		},
		usersReceived(state, action) {
			state.entities = action.payload
			state.dataLoaded = true
			state.isLoading = false
		},
		usersRequestFailed(state, action) {
			state.error = action.payload
			state.isLoading = false
		},
		authRequestSuccess(state, action) {
			state.auth = action.payload
			state.isLoggedIn = true
		},
		authRequestFailed(state, action) {
			state.error = action.payload
		},
		userCreated(state, action) {
			state.entities.push(action.payload)
		},
		userLoggedOut(state) {
			state.entities = []
			state.isLoggedIn = false
			state.auth = null
			state.dataLoaded = false
		},
		userUpdated(state, action) {
			const userToUpdate = state.entities.findIndex(
				e => e._id === action.payload._id
			)
			state.entities[userToUpdate] = action.payload
		},
		userUpdatedFailed(state, action) {
			state.error = action.payload
		},
		authRequested(state) {
			state.error = null
		},
	},
})

const { reducer: usersReducer, actions } = usersSlice
const {
	usersReceived,
	usersRequested,
	usersRequestFailed,
	authRequested,
	authRequestSuccess,
	authRequestFailed,
	userCreated,
	userLoggedOut,
	userUpdated,
	userUpdatedFailed,
} = actions

const userCreateRequested = createAction('users/userCreateRequested')
const userCreateFail = createAction('user/userCreateFail')
const userUpdateRequsted = createAction('users/userUpdateRequested')

export const singIn =
	({ payload, redirect }) =>
	async dispatch => {
		const { email, password } = payload

		dispatch(authRequested)

		try {
			const data = await authService.signIn({ email, password })
			dispatch(authRequestSuccess({ userId: data.localId }))
			localStorageService.setTokens(data)
			history.push(redirect)
		} catch (error) {
			dispatch(authRequestFailed(error.message))
		}
	}

export const signUp =
	({ email, password, ...rest }) =>
	async dispatch => {
		dispatch(authRequested())
		try {
			const data = await authService.register({ email, password })
			localStorageService.setTokens(data)
			dispatch(authRequestSuccess({ userId: data.localId }))
			dispatch(
				createUser({
					_id: data.localId,
					email,
					rate: getRandomInt(1, 5),
					completedMeetings: getRandomInt(0, 200),
					image: `https://avatars.dicebear.com/api/avataaars/${(
						Math.random() + 1
					)
						.toString(36)
						.substring(7)}.svg`,
					...rest,
				})
			)
		} catch (error) {
			const { code, message } = error.respose.data.error
			if (code === 400) {
				const errorMessage = generateAuthError(message)
				dispatch(authRequestFailed(errorMessage))
			} else {
				dispatch(authRequestFailed(error.message))
			}
		}
	}

export const logOut = () => dispatch => {
	localStorageService.removeAuthData()
	dispatch(userLoggedOut())
	history.push('/')
}

function createUser(payload) {
	return async dispatch => {
		dispatch(userCreateRequested())

		try {
			const { content } = await userService.create(payload)
			dispatch(userCreated(content))
			history.push('/users')
		} catch (error) {
			dispatch(userCreateFail(error.message))
		}
	}
}

export const loadUsersList = () => async (dispatch, getState) => {
	dispatch(usersRequested())

	try {
		const { content } = await userService.get()
		dispatch(usersReceived(content))
	} catch (error) {
		dispatch(usersRequestFailed(error.message))
	}
}

export const getUserById = userId => state => {
	if (state.users.entities) {
		const users = state.users.entities
		return users.find(u => u._id === userId)
	}
}

export const updateUserData = data => async (dispatch, getState) => {
	dispatch(userUpdateRequsted())
	try {
		const { content } = await userService.update(data)
		dispatch(userUpdated(content))
		history.push(`/users/${getState().users.auth.userId}`)
	} catch (error) {
		dispatch(userUpdatedFailed(error.message))
	}
}

export const getUsersList = () => state => state.users.entities

export const getUsersLoadingStatus = () => state => state.users.isLoading

export const getCurrentUserId = () => state => state.users.auth.userId

export const getCurrentUserData = () => state => {
	if (state.users.entities) {
		return state.users.entities.find(u => u._id === state.users.auth.userId)
	}
	return null
}

export const getIsLoggedIn = () => state => state.users.isLoggedIn

export const getDataStatus = () => state => state.users.dataLoaded

export const getAuthError = () => state => state.users.error

export default usersReducer
