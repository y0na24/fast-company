import React from 'react'
import PropTypes from 'prop-types'
import { validator } from '../../../utils/validator'
import api from '../../../api'
import SelectField from '../Form/SelectField'
import TextAreaField from '../Form/TextAreaField'

const initialData = { userId: '', content: '' }

const AddCommentForm = ({ onSubmit }) => {
  const [data, setData] = React.useState(initialData)
  const [users, setUsers] = React.useState({})
  const [erros, setErrors] = React.useState({})

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const validatorConfig = {
    userId: {
      isRequired: {
        message: 'Выберите от чьего имени хотите отправить сообщение'
      }
    },
    content: {
      isRequired: {
        message: 'Сообщение не может быть пустым'
      }
    }
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)

    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  React.useEffect(() => {
    api.users.fetchAll().then(setUsers)
  }, [])

  React.useEffect(() => {
    console.log(users)
  }, [users])

  const clearForm = () => {
    setData(initialData)
    setErrors({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    onSubmit(data)
    clearForm()
  }

  const arrayOfUsers =
    users &&
    Object.keys(users).map((userId) => ({
      label: users[userId].name,
      value: users[userId]._id
    }))

  return (
    <div>
      <h2>New comment</h2>
      <form onSubmit={handleSubmit}>
        <SelectField
          onChange={handleChange}
          options={arrayOfUsers}
          name='userId'
          value={data.userId}
          defaultOption='Выберите пользователя'
          error={erros.userId}
        />
        <TextAreaField
          value={data.content}
          onChange={handleChange}
          name='content'
          label='Сообщение'
          error={erros.content}
        />
        <div className='d-flex justify-content-end'>
          <button type='submit' className='btn btn-primary'>
            Опубликовать
          </button>
        </div>
      </form>
    </div>
  )
}

AddCommentForm.propTypes = {
  onSubmit: PropTypes.func
}

export default AddCommentForm
