import React, { useState } from 'react'
import api from '../api'
import Table from 'react-bootstrap/Table'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId))
  }
  const renderPhrase = (number) => {
    const unchangedInfo = `тусанет с тобой`

    if (number === 1 || (number >= 5 && number <= 12)) {
      return `${number} человек ${unchangedInfo}`
    } else if (number === 0) {
      return `Никто с тобой не тусанет`
    } else {
      return `${number} человека ${unchangedInfo}`
    }
  }

  return (
    <>
      <h2>
        <Badge bg={users.length === 0 ? 'danger' : 'primary'}>{renderPhrase(users.length)}</Badge>
      </h2>
      {users.length !== 0 && <Table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Качества</th>
            <th>Профессия</th>
            <th>Встретился, раз</th>
            <th>Оценка</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>
                {user.qualities.map((quality) => (
                  <Badge key={quality.color} className='m-2' bg={quality.color}>
                    {quality.name}
                  </Badge>
                ))}
              </td>
              <td>{user.profession.name}</td>
              <td>{user.completedMeetings}</td>
              <td>{user.rate}</td>
              <td>
                <Button key='btn' variant='danger' onClick={() => handleDelete(user._id)}>
                  delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>}   
    </>
  )
}

export default Users
