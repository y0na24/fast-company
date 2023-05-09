import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { toast } from 'react-toastify'

import userSerivce from '../services/user.service'
import { setTokens } from '../services/localStorage.service'

const httpAuth = axios.create()

const AuthContext = React.createContext()

export const useAuth = () => {
  return React.useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState({})
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    if (error !== null) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  const errorCatcher = (error) => {
    const { message } = error.response.data
    setError(message)
  }

  const signUp = async ({ email, password, ...rest }) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`

    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      })
      setTokens(data)

      await createUser({
        _id: data.localId,
        email,
        ...rest
      })
    } catch (error) {
      errorCatcher(error)
      const { code, message } = error.response.data.error

      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const errorObject = {
            email: 'Пользователь с таким Email уже сущесвтует'
          }
          throw errorObject
        }
      }
    }
  }

  const signIn = async ({ email, password, ...rest }) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`

    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      })
      setTokens(data)
    } catch (error) {
      errorCatcher(error)

      const { code, message } = error.response.data.error

      if (code === 400) {
        if (message === 'ERR_BAD_REQUEST') {
          const errorObject = {
            password: 'Неверный пароль'
          }
          throw errorObject
        }
      }
      console.log(error)
    }
  }

  const createUser = async (data) => {
    try {
      const { content } = await userSerivce.create(data)
      setCurrentUser(content)
    } catch (error) {
      errorCatcher(error)
    }
  }

  return (
    <AuthContext.Provider value={{ signUp, signIn, currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default AuthProvider
