import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

import { useAuth } from './useAuth'

import commentService from '../services/comment.service'

const CommentsContext = React.createContext()

export const useComments = () => {
  return useContext(CommentsContext)
}

export const CommentsProvider = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [comments, setComments] = React.useState([])
  const [error, setError] = React.useState(null)

  const { userId } = useParams()
  const { currentUser } = useAuth()

  React.useEffect(() => {
    getComments()
  }, [userId])

  React.useEffect(() => {
    if (error !== null) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  const createComment = async (data) => {
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      created_at: Date.now(),
      userId: currentUser._id
    }

    try {
      const { content } = await commentService.createComment(comment)
      setComments((prevState) => [...prevState, content])
    } catch (error) {
      errorCatcher(error)
    }
  }

  const getComments = async () => {
    try {
      const { content } = await commentService.getComments(userId)
      setComments(content)
    } catch (error) {
      errorCatcher(error)
    } finally {
      setIsLoading(false)
    }
  }

  const errorCatcher = (error) => {
    const { message } = error.response.data
    setError(message)
  }

  return (
    <CommentsContext.Provider value={{ comments, createComment, isLoading }}>
      {children}
    </CommentsContext.Provider>
  )
}

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
