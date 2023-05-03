import React from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

import professionService from '../services/profession.service'

const ProfessionContext = React.createContext()

export const useProfessions = () => {
  return React.useContext(ProfessionContext)
}

export const ProfessionProvider = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [professions, setProfessions] = React.useState([])
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    getProfessionsList()
  }, [])

  React.useEffect(() => {
    if (error !== null) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  const getProfessionsList = async () => {
    try {
      const { content } = await professionService.get()
      setProfessions(content)
      setIsLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }

  const getProfession = (id) => {
    return professions.find((p) => p._id === id)
  }

  const errorCatcher = (error) => {
    const { message } = error.response.data
    setError(message)
  }

  return (
    <ProfessionContext.Provider
      value={{ isLoading, professions, getProfession }}
    >
      {children}
    </ProfessionContext.Provider>
  )
}

ProfessionProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
