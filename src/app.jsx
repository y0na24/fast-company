import { useState } from 'react'
import Users from './components/users'
import SearchStatus from './components/searchStatus'
import api from './api'

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId))
  }

  const handleToggleBookMark = (id) => {
    setUsers(users.map(user => {
      if (user._id === id) {
        return {
          ...user,
          bookmark: !user.bookmark
        }
      }
      return user
    }))
  } 

  return (
    <>
      <SearchStatus length={users.length} />

      {users.length > 0 && (
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Имя</th>
              <th scope='col'>Качества</th>
              <th scope='col'>Профессия</th>
              <th scope='col'>Встретился, раз</th>
              <th scope='col'>Оценка</th>
              <th scope='col'>Избранное</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <Users users={users} onDelete={handleDelete} onToggle={handleToggleBookMark} />
          </tbody>
        </table>
      )}
    </>
  )
}

export default App
