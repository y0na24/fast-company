import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import TextField from '../common/Form/TextField'
import SelectField from '../common/Form/SelectField'
import RadioField from '../common/Form/RadioField'
import MultiSelectField from '../common/Form/MultiSelectField'
import CheckBoxField from '../common/Form/CheckBoxField'

import { useAuth } from '../../hooks/useAuth'
import { validator } from '../../utils/validator'

import { getQualities } from '../../store/qualititesSlice'
import { getProfessions } from '../../store/professionsSlice'

const RegisterForm = () => {
	const history = useHistory()

	const [formData, setFormData] = React.useState({
		email: '',
		password: '',
		profession: '',
		sex: 'male',
		qualities: [],
		name: '',
		license: false,
	})
	const [errors, setErrors] = React.useState({})

	const { signUp } = useAuth()
	const qualities = useSelector(getQualities())
	const professions = useSelector(getProfessions())

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
		name: {
			isRequired: { message: 'Имя обязяталеьно для заполнения' },
			min: { message: 'Имя должно состоять из 3 символов', value: 3 },
		},
		password: {
			isRequired: { message: 'Пароль обязателен для заполнения ' },
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
		profession: {
			isRequired: { message: 'Обязательно выберите вашу профессию' },
		},
		license: {
			isRequired: {
				message:
					'Вы не можете использовать наш сервис без лицензионного согласшения',
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

	const handleFormSubmit = async event => {
		event.preventDefault()
		const isValid = validate()

		if (!isValid) return

		const newFormData = {
			...formData,
			qualities: formData.qualities.map(quality => quality.value),
		}

		console.log(newFormData)

		try {
			await signUp(newFormData)
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
				label='Имя'
				name='name'
				value={formData.name}
				error={errors.name}
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
					{ name: 'Other', value: 'other' },
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
