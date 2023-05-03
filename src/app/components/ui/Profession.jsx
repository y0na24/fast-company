import React from 'react'
import PropTypes from 'prop-types'
import { useProfessions } from '../../hooks/useProfession'

const Profession = ({ id }) => {
  const { isLoading, getProfession } = useProfessions()
  const prof = getProfession(id)

  return (
    !isLoading ? <p>{prof.name}</p> : 'Loading...'
  )
}

Profession.propTypes = {
  id: PropTypes.string
}

export default Profession
