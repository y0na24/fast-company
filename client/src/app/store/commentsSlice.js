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
      state.entities.push(action.payload)
    },
    commentRemoved(state, action) {
      state.entities = state.entities.filter((comment) => comment._id !== action.payload)
    },
  },
})

const { reducer: commentsReducer, actions } = commentsSlice
const { commentsReceived, commentsRequestFailed, commentsRequested, commentCreated, commentRemoved } = actions

const commentRemovingFailed = createAction('comments/commentRemovingFailed')
const commentAddingFailed = createAction('comments/commentAddingFailed')

export const loadCommentsList = (userId) => async (dispatch, getState) => {
  dispatch(commentsRequested)

  try {
    const { content } = await commentsService.getComments(userId)
    dispatch(commentsReceived(content))
  } catch (error) {
    dispatch(commentsRequestFailed(error.message))
  }
}

export const removeComment = (id) => async (dispatch) => {
  try {
    const { content } = await commentsService.removeComment(id)

    if (!content) {
      dispatch(commentRemoved(id))
    }
  } catch (error) {
    dispatch(commentRemovingFailed(error.message))
  }
}

export const createComment = (payload) => async (dispatch, getState) => {
  try {
    const { content } = await commentsService.createComment(payload)
    dispatch(commentCreated(content))
  } catch (error) {
    dispatch(commentAddingFailed(error.message))
  }
}

export const getComments = () => (state) => state.comments.entities

export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading

export default commentsReducer
