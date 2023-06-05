import React from 'react'
import { useParams } from 'react-router-dom'
import { orderBy } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

import CommentsList from '../common/Comments/CommentsList'
import AddCommentForm from '../common/Comments/AddCommentForm'

import { useComments } from '../../hooks/useComments'

import {
	getComments,
	getCommentsLoadingStatus,
	loadCommentsList,
} from '../../store/commentsSlice'

const Comments = () => {
	const { userId } = useParams()
	const dispatch = useDispatch()

	const { createComment, removeComment } = useComments()

	const comments = useSelector(getComments())
	const isLoading = useSelector(getCommentsLoadingStatus())

	React.useEffect(() => {
		dispatch(loadCommentsList(userId))
	}, [userId])

	const handleSubmit = data => {
		createComment(data)
	}

	const handleRemoveComment = id => {
		removeComment(id)
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
						{!isLoading ? (
							<CommentsList
								comments={sortedComments}
								onRemove={handleRemoveComment}
							/>
						) : (
							<h2>Loading...</h2>
						)}
					</div>
				</div>
			)}
		</>
	)
}

export default Comments
