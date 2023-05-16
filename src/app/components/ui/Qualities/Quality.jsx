import React from 'react'
import PropTypes from 'prop-types'
import { useQualities } from '../../../hooks/useQualities'

const Quality = ({ id }) => {
  const { getQualities } = useQualities()
  const quality = getQualities(id)

  return <span className={'badge m-1 bg-' + quality.color}>{quality.name}</span>
}

Quality.propTypes = {
  id: PropTypes.string
}

export default Quality
