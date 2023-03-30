import React from 'react'
import TextField from '../common/Form/TextField'
import { validator } from '../../utils/validator'

const LoginForm = () => {
  const [formData, setFormData] = React.useState({ email: '', password: '' })
  const [errors, setErrors] = React.useState({})

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

  React.useEffect(() => {
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
      <button
        className="btn btn-primary w-100 mx-auto"
        type="submit"
        disabled={!isValid}
      >
        Submit
      </button>
    </form>
  )
}

export default LoginForm
