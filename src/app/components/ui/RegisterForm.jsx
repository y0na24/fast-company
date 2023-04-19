import React from 'react'
import TextField from '../common/Form/TextField'
import { validator } from '../../utils/validator'
import api from '../../api'
import SelectField from '../common/Form/SelectField'
import RadioField from '../common/Form/RadioField'
import MultiSelectField from '../common/Form/MultiSelectField'
import CheckBoxField from '../common/Form/CheckBoxField'

const RegisterForm = () => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    license: false
  })

  const [qualities, setQualities] = React.useState([])
  const [errors, setErrors] = React.useState({})
  const [professions, setProfessions] = React.useState([])

  React.useEffect(() => {
    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }))
      setProfessions(professionsList)
    })

    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        label: data[optionName].name,
        value: data[optionName]._id,
        color: data[optionName].color
      }))
      setQualities(qualitiesList)
    })
  }, [])

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
    },
    profession: {
      isRequired: { message: 'Обязательно выберите вашу профессию' }
    },
    license: {
      isRequired: {
        message:
          'Вы не можете использовать наш сервис без лицензионного согласшения'
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

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label }
      }
    }
  }
  const getQualities = (elements) => {
    const qualitiesArray = []
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color
          })
        }
      }
    }
    return qualitiesArray
  }

  const isValid = Object.keys(errors).length === 0

  const handleFormSubmit = (event) => {
    event.preventDefault()
    const isValid = validate()

    if (!isValid) return

    const { profession, qualities } = formData
    console.log({
      ...formData,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities)
    })
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
      <SelectField
        label='Выберите профессию:'
        onChange={handleChange}
        name='profession'
        options={professions}
        defaultOption='Choose...'
        error={errors.profession}
        value={formData.profession}
      />
      <RadioField
        options={[
          { name: 'Male', value: 'male' },
          { name: 'Female', value: 'female' },
          { name: 'Other', value: 'other' }
        ]}
        value={formData.sex}
        name='sex'
        onChange={handleChange}
        label='Выберите пол:'
      />
      <MultiSelectField
        options={qualities}
        onChange={handleChange}
        defaultValue={formData.qualities}
        name='qualities'
        label='Выберите ваши качества:'
      />
      <CheckBoxField
        onChange={handleChange}
        name='license'
        value={formData.license}
        error={errors.license}
      >
        Подтвердить <a href='#'>лицензионное соглашение</a>
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

export default RegisterForm
