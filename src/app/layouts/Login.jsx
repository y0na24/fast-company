import React, { useEffect, useState } from 'react'
import TextField from '../components/TextField'
import { validator } from '../utils/validator'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  const handleChange = ({ target }) => {
    setFormData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }
  const validatorConfig = {
    email: {
      isRequired: { message: 'Почта обязательна для заполнения ' },
      isEmail: { message: 'Email введён некорректно' }
    },
    password: {
      isRequired: { message: 'Пароль обязателен для заполнения ' },
      isCapitalSymbol: {
        message: 'Пароль должен содержать хотя бы одну заглавную букву'
      },
      isContainDigit: {
        message: 'Пароль должен содержать хотя бы одну цифру'
      },
      min: {
        message: 'Пароль должен состоять минимум из восьми символов',
        value: 8
      }
    }
  }

  useEffect(() => {
    validate()
  }, [formData])

  const validate = () => {
    const errors = validator(formData, validatorConfig)

    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  const handleFormSubmit = (event) => {
    event.preventDefault()
    const isValid = validate()
    if (!isValid) return
    console.log(formData)
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h3 className='mb-4'>Login</h3>
          <form onSubmit={handleFormSubmit}>
            <TextField
              label="Почта"
              name="email"
              value={formData.email}
              error={errors.email}
              onChange={handleChange}
            />
            <TextField
              label="Пароль"
              type="password"
              name="password"
              error={errors.password}
              value={formData.password}
              onChange={handleChange}
            />
            <button className='btn btn-primary w-100 mx-auto' type="submit" disabled={!isValid}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
