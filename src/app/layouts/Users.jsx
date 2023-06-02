import React from 'react'
import { Redirect, useParams } from 'react-router-dom'

import UserPage from '../components/page/UserPage'
import UsersListPage from '../components/page/UsersListPage'
import EditUserPage from '../components/page/EditUserPage'

import UserProvider from '../hooks/useUsers'

import UsersLoader from '../components/ui/hoc/UsersLoader'
import { useSelector } from 'react-redux'
import { getCurrentUserId } from '../store/usersSlice'

const Users = () => {
	const params = useParams()
	const { userId, edit } = params
	const currentUserId = useSelector(getCurrentUserId())

	return (
		<>
			<UsersLoader>
				<UserProvider>
					{userId ? (
						edit ? (
							userId === currentUserId ? (
								<EditUserPage />
							) : (
								<Redirect to={`/users/${currentUserId}/edit`} />
							)
						) : (
							<UserPage userId={userId} />
						)
					) : (
						<UsersListPage />
					)}
				</UserProvider>
			</UsersLoader>
		</>
	)
}

export default Users
