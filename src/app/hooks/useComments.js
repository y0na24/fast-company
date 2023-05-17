import React, { useContext } from 'react'
import PropTypes from 'prop-types'
// import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { useAuth } from './useAuth'
import { nanoid } from 'nanoid'

const CommentsContext = React.createContext()

export const useComments = () => {
  return useContext(CommentsContext)
}

export const CommentsProvider = ({ children }) => {
  // const [isLoading, setIsLoading] = React.useState(true)
  const [comments, setComments] = React.useState([])
  // const [error, setError] = React.useState(null)

  const { userId } = useParams()
  const { currentUser } = useAuth()

  React.useEffect(() => {
    setComments(null)
  }, [])

  const createComment = async (data) => {
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      created_at: Date.now(),
      userId: currentUser._id
    }

    console.log(comment)
  }

  return (
    <CommentsContext.Provider value={{ comments, createComment }}>
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
