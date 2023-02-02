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
    
    if (number === 1 || number >= 5 && number <= 12) {
      return `${number} человек ${unchangedInfo}`
    } else {
      return `${number} человека ${unchangedInfo}`
    }
    
  }
  const renderBadges = (user) => {
    return user.qualities.map((quality) => (
      <Badge key={quality.color} className='m-2' bg={quality.color}>
        {quality.name}
      </Badge>
    ))
  }
  const renderTable = () => {
    return users.map((user) => (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>{renderBadges(user)}</td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate}</td>
        <td>
          <Button key='btn' variant='danger' onClick={() => handleDelete(user._id)}>
            delete
          </Button>
        </td>
      </tr>
    ))
  }

  if (users.length === 0) {
    return (
      <Badge bg='danger' className='mt-2'>
        <h2>Никто с тобой не тусанет</h2>
      </Badge>
    )
  }

  return (
    <>
      <h2>
        <Badge bg='primary'>{renderPhrase(users.length)}</Badge>
      </h2>
      <Table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Качества</th>
            <th>Профессия</th>
            <th>Встретился, раз</th>
            <th>Оценка</th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </Table>
    </>
  )
}

export default Users
