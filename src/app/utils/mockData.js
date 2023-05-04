import React from 'react'

import professions from '../mockData/professions.json'
import qualities from '../mockData/qualities.json'
import users from '../mockData/users.json'
import httpService from '../services/http.service'

const useMockData = () => {
  const statusConsts = {
    idle: 'Not started',
    pending: 'In Process',
    successed: 'Ready',
    error: 'Error occured'
  }

  const [error, setError] = React.useState()
  const [status, setStatus] = React.useState(statusConsts.idle)
  const [progress, setProgress] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const summaryCount = professions.length + qualities.length + users.length

  const incrementCount = () => {
    setCount((prevState) => prevState + 1)
  }

  const updateProgress = () => {
    if (count !== 0 && status === statusConsts.idle) {
      setStatus(statusConsts.pending)
    }

    const newProgress = Math.floor((count / summaryCount) * 100)
    if (progress < newProgress) {
      setProgress(() => newProgress)
    }

    if (newProgress === 100) {
      setStatus(statusConsts.successed)
    }
  }

  React.useEffect(() => {
    updateProgress()
  }, [count])

  const initialize = async () => {
    try {
      for (const prof of professions) {
        await httpService.put('profession/' + prof._id, prof)
        incrementCount()
      }

      for (const user of users) {
        await httpService.put('user/' + user._id, user)
        incrementCount()
      }

      for (const qual of qualities) {
        await httpService.put('quality/' + qual._id, qual)
        incrementCount()
      }
    } catch (error) {
      setError(error)
      setStatus(statusConsts.error)
    }
  }

  return { error, initialize, progress, status }
}

export default useMockData
