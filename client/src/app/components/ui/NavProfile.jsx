import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { getCurrentUserData } from '../../store/usersSlice'

const NavProfile = () => {
	const currentUser = useSelector(getCurrentUserData())

	const [isOpen, setIsOpen] = React.useState(false)

	const toggleMenu = () => {
		setIsOpen(prevState => !prevState)
	}

	return !currentUser ? (
		<h2>Loading...</h2>
	) : (
		<div className='dropdown' onClick={toggleMenu}>
			<div className='btn dropdown-toggle d-flex align-items-center'>
				<div className='me-2'>{currentUser.name}</div>
				<img
					src={currentUser.image}
					alt='Аватарка'
					className='img-responsive rounded-circle'
					height={40}
				/>
			</div>
			<div className={`w-100 dropdown-menu ${isOpen ? 'show' : ''}`}>
				<Link to={`/users/${currentUser._id}`} className='dropdown-item'>
					Profile
				</Link>
				<Link to='/logout' className='dropdown-item'>
					Log Out
				</Link>
			</div>
		</div>
	)
}

export default NavProfile
