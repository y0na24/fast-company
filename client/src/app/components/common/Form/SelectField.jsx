import React from 'react'
import PropTypes from 'prop-types'

const SelectField = ({
  label,
  value,
  onChange,
  defaultOption,
  options,
  error,
  name
}) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  const getInputClasses = () => {
    return 'form-select' + (error ? ' is-invalid' : '')
  }

  const optionsArray =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.keys(options).map((o) => ({
          label: options[o].name,
          value: options[o]._id
        }))
      : options.map((o) => ({
          label: o.name,
          value: o._id
        }))

  return (
    <div className='mb-4'>
      <label htmlFor={name} className='form-label'>
        {label}
      </label>
      <select
        value={value}
        className={getInputClasses()}
        id={name}
        name={name}
        onChange={handleChange}
      >
        <option disabled value=''>
          {defaultOption}
        </option>
        {optionsArray.length > 0 &&
          optionsArray.map((option) => {
            return (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            )
          })}
      </select>
      <div className='invalid-feedback'>{error}</div>
    </div>
  )
}

SelectField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  defaultOption: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  error: PropTypes.string,
  name: PropTypes.string
}

export default SelectField
