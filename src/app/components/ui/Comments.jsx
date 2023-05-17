import React from 'react'
import api from '../../api'
import { useParams } from 'react-router-dom'
import { orderBy } from 'lodash'
import CommentsList from '../common/Comments/CommentsList'
import AddCommentForm from '../common/Comments/AddCommentForm'
import { useComments } from '../../hooks/useComments'

const Comments = () => {
  const [comments, setComments] = React.useState([])

  const { userId } = useParams()
  const { createComment } = useComments()

  React.useEffect(() => {
    api.comments.fetchCommentsForUser(userId).then((data) => setComments(data))
  })

  const handleSubmit = (data) => {
    createComment(data)
    // api.comments
    //   .add({ ...data, pageId: userId, userId })
    //   .then((data) => setComments([...comments, data]))
  }

  const handleRemoveComment = (id) => {
    api.comments.remove(id).then((id) => {
      setComments(comments.filter((x) => x._id !== id))
    })
  }

  const sortedComments = orderBy(comments, ['created_at'], ['desc'])

  return (
    <>
      <div className='card mb-2'>
        <div className='card-body'>
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>

      {sortedComments.length > 0 && (
        <div className='card mb-3'>
          <div className='card-body'>
            <h2>Comments</h2>
            <hr />
            <CommentsList
              comments={sortedComments}
              onRemove={handleRemoveComment}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Comments
