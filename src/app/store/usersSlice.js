import { createAction, createSlice } from '@reduxjs/toolkit'

import userService from '../services/user.service'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import getRandomInt from '../utils/getRandomInt'
import history from '../utils/history'

const usersSlice = createSlice({
	name: 'users',
	initialState: {
		entites: [],
		isLoading: true,
		error: null,
		auth: null,
		isLoggedIn: false,
	},
	reducers: {
		usersRequested(state) {
			state.isLoading = true
		},
		usersReceived(state, action) {
			state.entites = action.payload
			state.isLoading = false
		},
		usersRequestFailed(state, action) {
			state.error = action.payload
			state.isLoading = false
		},
		authRequestSuccess(state, action) {
			state.auth = { ...action.payload, isLoggedIn: true }
		},
		authRequestFailed(state, action) {
			state.error = action.payload
		},
		userCreated(state, action) {
			state.entites.push(action.payload)
		},
	},
})

const { reducer: usersReducer, actions } = usersSlice
const {
	usersReceived,
	usersRequested,
	usersRequestFailed,
	authRequestSuccess,
	authRequestFailed,
	userCreated,
} = actions

const authRequested = createAction('users/authRequested')
const userCreateRequested = createAction('users/userCreateRequested')
const userCreateFail = createAction('user/userCreateFail')

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
			dispatch(authRequestFailed(error.message))
		}
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
	if (state.users.entites) {
		const users = state.users.entites
		return users.find(u => u._id === userId)
	}
}

export const getUsersList = () => state => state.users.entites

export default usersReducer
