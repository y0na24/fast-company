import React from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import qualitiesService from '../services/qualities.service'

const QualityContext = React.createContext()

export const useQualities = () => {
  return React.useContext(QualityContext)
}

export const QualityProvider = ({ children }) => {
  const [qualities, setQualities] = React.useState([])
  const [error, setError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    getQualitiesList()
  }, [])

  React.useEffect(() => {
    if (error !== null) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  const getQualitiesList = async () => {
    try {
      const { content } = await qualitiesService.get()
      setQualities(content)
      setIsLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }

  const getQualities = (id) => {
    return qualities.find((q) => q._id === id)
  }

  const errorCatcher = (error) => {
    const { message } = error.response.data
    setError(message)
  }

  return (
    <QualityContext.Provider value={{ qualities, isLoading, getQualities }}>
      {children}
    </QualityContext.Provider>
  )
}

QualityProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
