import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import API from '../api'
import Quality from './Quality'

const UserPage = () => {
  const [user, setUser] = useState()
  const userId = useParams().userId
  useEffect(() => {
    API.users.getById(userId).then((data) => setUser(data))
  }, [])

  if (user) {
    return (
      <>
        <h1>{user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        <Quality
          color={user.qualities[0].color}
          name={user.qualities[0].name}
        />
        <p>Completed meetings: {user.completedMeetings}</p>
        <h2>Rate: {user.rate}</h2>
        <Link to="/users">
          <button>Все пользователи</button>
        </Link>
        {console.log(user)}
      </>
    )
  }
  return <h1>Loading</h1>
}

export default UserPage
