import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { validator } from '../../../utils/validator'
import TextField from '../../common/Form/TextField'
import SelectField from '../../common/Form/SelectField'
import RadioField from '../../common/Form/RadioField'
import MultiSelectField from '../../common/Form/MultiSelectField'
import BackHistoryButton from '../../common/BackHistoryButton'
import { useQualities } from '../../../hooks/useQualities'
import { useProfessions } from '../../../hooks/useProfession'
import { useAuth } from '../../../hooks/useAuth'

const EditUserPage = () => {
  const [errors, setErrors] = useState({})
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({
    name: '',
    email: '',
    profession: '',
    sex: 'male',
    qualities: []
  })

  const { updateUser, currentUser } = useAuth()

  const user = currentUser

  const { qualities, getQualities } = useQualities()
  const { professions } = useProfessions()

  const getQualityId = (qualities) => {
    return qualities.map((q) => q.value)
  }

  const transformData = (data) => {
    return data.map((qual) => {
      const { _id, name } = getQualities(qual)

      return {
        label: name,
        value: _id
      }
    })
  }

  useEffect(() => {
    setIsLoading(true)

    const { profession, qualities, ...data } = user

    setData((prevState) => ({
      ...prevState,
      ...data,
      qualities: transformData(qualities),
      profession
    }))
  }, [user])

  useEffect(() => {
    if (data._id) setIsLoading(false)
  }, [data])

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения'
      },
      isEmail: {
        message: 'Email введен некорректно'
      }
    },
    name: {
      isRequired: {
        message: 'Введите ваше имя'
      }
    }
  }

  useEffect(() => {
    validate()
  }, [data])

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  const handleSubmit = (e) => {
    e.preventDefault()

    const isValid = validate()
    if (!isValid) return

    updateUser({
      ...data,
      qualities: getQualityId(data.qualities)
    })

    history.goBack()
  }

  return (
    <div className='container mt-5'>
      <BackHistoryButton />
      <div className='row'>
        <div className='col-md-6 offset-md-3 shadow p-4'>
          {!isLoading && Object.keys(professions).length > 0 ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label='Имя'
                name='name'
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label='Электронная почта'
                name='email'
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectField
                label='Выбери свою профессию'
                defaultOption='Choose...'
                options={professions}
                name='profession'
                onChange={handleChange}
                value={data.profession}
                error={errors.profession}
              />
              <RadioField
                options={[
                  { name: 'Male', value: 'male' },
                  { name: 'Female', value: 'female' },
                  { name: 'Other', value: 'other' }
                ]}
                value={data.sex}
                name='sex'
                onChange={handleChange}
                label='Выберите ваш пол'
              />
              <MultiSelectField
                defaultValue={data.qualities}
                options={qualities}
                onChange={handleChange}
                name='qualities'
                label='Выберите ваши качества'
              />
              <button
                type='submit'
                disabled={!isValid}
                className='btn btn-primary w-100 mx-auto'
              >
                Обновить
              </button>
            </form>
          ) : (
            'Loading...'
          )}
        </div>
      </div>
    </div>
  )
}

export default EditUserPage
