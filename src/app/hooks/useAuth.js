import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { toast } from 'react-toastify'

import userSerivce from '../services/user.service'
import localStorageService, {
  setTokens
} from '../services/localStorage.service'

export const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY
  }
})

const AuthContext = React.createContext()

export const useAuth = () => {
  return React.useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState()
  const [error, setError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    if (error !== null) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  React.useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getCurrentUserData()
    } else {
      setIsLoading(false)
    }
  }, [])

  const getCurrentUserData = async () => {
    try {
      const { content } = await userSerivce.getCurrentUser()
      setCurrentUser(content)
    } catch (error) {
      errorCatcher(error)
    } finally {
      setIsLoading(false)
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

  const errorCatcher = (error) => {
    const { message } = error.response.data
    setError(message)
  }

  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const signUp = async ({ email, password, ...rest }) => {
    try {
      const { data } = await httpAuth.post('accounts:signUp', {
        email,
        password,
        returnSecureToken: true
      })
      setTokens(data)

      await createUser({
        _id: data.localId,
        email,
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 200),
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
    try {
      const { data } = await httpAuth.post('accounts:signInWithPassword', {
        email,
        password,
        returnSecureToken: true
      })
      setTokens(data)
      await getCurrentUserData()
    } catch (error) {
      errorCatcher(error)

      const { code, message } = error.response.data.error

      if (code === 400) {
        switch (message) {
          case 'INVALID_PASSWORD':
            throw new Error('Email или пароль введены некорректно')

          default:
            throw new Error('Слишком много попыток входа, попробуйте позднее')
        }
      }
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{ signUp, signIn, currentUser }}>
      {!isLoading ? children : 'Loading...'}
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
