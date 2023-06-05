import { createAction, createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

import commentsService from '../services/comment.service'

const commentsSlice = createSlice({
	name: 'comments',
	initialState: {
		entities: [],
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
		commentCreated(state, action) {
			console.log(action.payload)
			state.entities.push(action.payload)
		},
		commentRemoved(state, action) {
			state.entities = state.entities.filter(
				item => item._id !== action.payload
			)
		},
	},
})

const { reducer: commentsReducer, actions } = commentsSlice
const {
	commentsReceived,
	commentsRequestFailed,
	commentsRequested,
	commentCreated,
	commentRemoved,
} = actions

const commentRemovingFailed = createAction('comments/commentRemovingFailed')
const commentAddingFailed = createAction('comments/commentAddingFailed')

export const loadCommentsList = userId => async (dispatch, getState) => {
	dispatch(commentsRequested)

	try {
		const { content } = await commentsService.getComments(userId)
		dispatch(commentsReceived(content))
	} catch (error) {
		dispatch(commentsRequestFailed(error.message))
	}
}

export const removeComment = id => async dispatch => {
	try {
		const { content } = await commentsService.removeComment(id)

		if (content === null) {
			dispatch(commentRemoved(id))
		}
	} catch (error) {
		dispatch(commentRemovingFailed(error.message))
	}
}

export const createComment = (data, pageId) => async (dispatch, getState) => {
	const comment = {
		...data,
		_id: nanoid(),
		pageId: pageId,
		created_at: Date.now(),
		userId: getState().users.auth.userId,
	}

	try {
		const { content } = await commentsService.createComment(comment)
		dispatch(commentCreated(content))
	} catch (error) {
		dispatch(commentAddingFailed(error.message))
	}
}

export const getComments = () => state => state.comments.entities

export const getCommentsLoadingStatus = () => state => state.comments.isLoading

export default commentsReducer
