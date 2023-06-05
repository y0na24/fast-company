import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { validator } from '../../../utils/validator'

import TextField from '../../common/Form/TextField'
import SelectField from '../../common/Form/SelectField'
import RadioField from '../../common/Form/RadioField'
import MultiSelectField from '../../common/Form/MultiSelectField'
import BackHistoryButton from '../../common/BackHistoryButton'

import {
	getQualities,
	getQualitiesLoadingStatus,
	getQualitiesByIds,
} from '../../../store/qualititesSlice'
import {
	getProfessions,
	getProfessionsLoadingStatus,
} from '../../../store/professionsSlice'
import { getCurrentUserData, updateUserData } from '../../../store/usersSlice'

const EditUserPage = () => {
	const dispatch = useDispatch()
	const [errors, setErrors] = React.useState({})
	const [isLoading, setIsLoading] = React.useState(true)
	const [data, setData] = React.useState()

	const currentUser = useSelector(getCurrentUserData())
	const qualities = useSelector(getQualities())
	const qualitiesLoading = useSelector(getQualitiesLoadingStatus())
	const qualititesList = useSelector(getQualitiesByIds(currentUser.qualities))
	const professionsLoading = useSelector(getProfessionsLoadingStatus())
	const professions = useSelector(getProfessions())

	React.useEffect(() => {
		if (!professionsLoading && !qualitiesLoading && currentUser && !data) {
			setData({
				...currentUser,
				qualities: qualititesList.map(q => ({ label: q.name, value: q._id })),
			})
		}
	}, [professionsLoading, qualitiesLoading, currentUser, data])

	React.useEffect(() => {
		if (data && isLoading) {
			setIsLoading(false)
		}
	}, [data])

	const validatorConfig = {
		email: {
			isRequired: {
				message: 'Электронная почта обязательна для заполнения',
			},
			isEmail: {
				message: 'Email введен некорректно',
			},
		},
		name: {
			isRequired: {
				message: 'Введите ваше имя',
			},
		},
	}

	React.useEffect(() => {
		validate()
	}, [data])

	const handleChange = target => {
		setData(prevState => ({
			...prevState,
			[target.name]: target.value,
		}))
	}

	const validate = () => {
		const errors = validator(data, validatorConfig)
		setErrors(errors)
		return Object.keys(errors).length === 0
	}

	const isValid = Object.keys(errors).length === 0

	const handleSubmit = e => {
		e.preventDefault()

		const isValid = validate()
		if (!isValid) return

		dispatch(
			updateUserData({ ...data, qualities: data.qualities.map(q => q.value) })
		)
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
									{ name: 'Other', value: 'other' },
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
