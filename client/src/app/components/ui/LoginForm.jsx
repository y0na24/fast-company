import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import TextField from '../common/Form/TextField'
import CheckBoxField from '../common/Form/CheckBoxField'

import { validator } from '../../utils/validator'

import { getAuthError, singIn } from '../../store/usersSlice'

const LoginForm = () => {
	const dispatch = useDispatch()

	const history = useHistory()

	const [formData, setFormData] = React.useState({
		email: '',
		password: '',
		stayOn: false,
	})

	const loginError = useSelector(getAuthError())
	const [errors, setErrors] = React.useState({})

	const handleChange = target => {
		setFormData(prevState => ({
			...prevState,
			[target.name]: target.value,
		}))
	}

	const validatorConfig = {
		email: {
			isRequired: { message: 'Почта обязательна для заполнения ' },
			isEmail: { message: 'Email введён некорректно' },
		},
		password: {
			isRequired: { message: 'Пароль обязателен для заполнения' },
			isCapitalSymbol: {
				message: 'Пароль должен содержать хотя бы одну заглавную букву',
			},
			isContainDigit: {
				message: 'Пароль должен содержать хотя бы одну цифру',
			},
			min: {
				message: 'Пароль должен состоять минимум из восьми символов',
				value: 8,
			},
		},
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

	const handleFormSubmit = event => {
		event.preventDefault()
		const isValid = validate()
		if (!isValid) return

		const redirect = history.location.state
			? history.location.state.from.pathname
			: '/'

		dispatch(singIn({ payload: formData, redirect }))
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
			{loginError && <p className='text-danger'>{loginError}</p>}
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
