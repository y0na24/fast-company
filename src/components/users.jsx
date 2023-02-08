import React, { useState } from 'react'
import User from './user'

const Users = ({ users, ...rest }) => {
  return (
    <>
      {users.map((user) => (
        <User
          key={user._id}
          _id={user._id}
          name={user.name}
          profession={user.profession}
          qualities={user.qualities}
          completedMeetings={user.completedMeetings}
          rate={user.rate}
          bookmark={user.bookmark}
          onDelete={rest.onDelete}
          onToggle={rest.onToggle}
        />
      ))}
    </>
  )
}

export default Users
