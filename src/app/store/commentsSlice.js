import { createSlice } from '@reduxjs/toolkit'

import commentsService from '../services/comment.service'

const commentsSlice = createSlice({
	name: 'comments',
	initialState: {
		entities: null,
		isLoading: true,
		error: null,
	},
	reducers: {
		commentsRequested(state) {
			state.isLoading = true
		},
		commentsReceived(state, action) {
			state.entities = action.payload
			state.isLoading = false
		},
		commentsRequestFailed(state, action) {
			state.error = action.payload
			state.isLoading = false
		},
	},
})

const { reducer: commentsReducer, actions } = commentsSlice
const { commentsReceived, commentsRequestFailed, commentsRequested } = actions

export const loadCommentsList = userId => async (dispatch, getState) => {
	dispatch(commentsRequested)

	try {
		const { content } = await commentsService.getComments(userId)
		dispatch(commentsReceived(content))
	} catch (error) {
		dispatch(commentsRequestFailed(error.message))
	}
}

export const getComments = () => state => state.comments.entities

export const getCommentsLoadingStatus = () => state => state.comments.isLoading

export default commentsReducer
