import React from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

import userSerivce from '../services/user.service'

const UserContext = React.createContext()

export const useUser = () => {
  return React.useContext(UserContext)
}

const UserProvider = ({ children }) => {
  const [users, setUsers] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    if (error !== null) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  const getUsers = async () => {
    try {
      const { content } = await userSerivce.get()
      setUsers(content)
      setIsLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }

  const errorCatcher = (error) => {
    const { message } = error.response.data
    setError(message)
  }

  React.useState(() => {
    getUsers()
  }, [])

  return (
    <UserContext.Provider value={{ users }}>
      {!isLoading ? children : <h1>Users loading...</h1>}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default UserProvider
