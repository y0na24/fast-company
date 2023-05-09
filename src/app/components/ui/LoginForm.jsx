import React from 'react'
import TextField from '../common/Form/TextField'
import { validator } from '../../utils/validator'
import CheckBoxField from '../common/Form/CheckBoxField'
import { useAuth } from '../../hooks/useAuth'
import { useHistory } from 'react-router-dom'

const LoginForm = () => {
  const history = useHistory()

  const { signIn } = useAuth()

  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    stayOn: false
  })
  const [errors, setErrors] = React.useState({})

  const handleChange = (target) => {
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
      isRequired: { message: 'Пароль обязателен для заполнения' },
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

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    const isValid = validate()
    if (!isValid) return
    console.log(formData)

    try {
      await signIn(formData)
      history.push('/')
    } catch (error) {
      setErrors(error)
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <TextField
        label='Почта'
        name='email'
        value={formData.email}
        error={errors.email}
        onChange={handleChange}
      />
      <TextField
        label='Пароль'
        type='password'
        name='password'
        error={errors.password}
        value={formData.password}
        onChange={handleChange}
      />
      <CheckBoxField
        onChange={handleChange}
        name='stayOn'
        value={formData.stayOn}
      >
        Оставаться в системе
      </CheckBoxField>
      <button
        className='btn btn-primary w-100 mx-auto'
        type='submit'
        disabled={!isValid}
      >
        Submit
      </button>
    </form>
  )
}

export default LoginForm
