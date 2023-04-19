import React from 'react'
import { useParams } from 'react-router-dom'
import UserPage from '../components/page/UserPage'
import UsersListPage from '../components/page/UsersListPage'
import EditUserPage from '../components/page/EditUserPage'

const Users = () => {
  const params = useParams()
  const { userId, edit } = params

  return (
    <>
      {userId ? (
        edit ? (
          <EditUserPage />
        ) : (
          <UserPage userId={userId} />
        )
      ) : (
        <UsersListPage />
      )}
    </>
  )
}

export default Users
