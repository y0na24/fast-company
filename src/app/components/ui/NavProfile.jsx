import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Link } from 'react-router-dom'

const NavProfile = () => {
  const {
    currentUser: { name, _id }
  } = useAuth()

  const [isOpen, setIsOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState)
  }

  return (
    <div className='dropdown' onClick={toggleMenu}>
      <div className='btn dropdown-toggle d-flex align-items-center'>
        <div className='me-2'>{name}</div>
        <img
          src='https://avatars.dicebear.com/api/avataaars/qweqasdas.svg'
          alt='Аватарка'
          className='img-responsive rounded-circle'
          height={40}
        />
      </div>
      <div className={`w-100 dropdown-menu ${isOpen ? 'show' : ''}`}>
        <Link to={`users/${_id}`} className='dropdown-item'>
          Profile
        </Link>
        <Link to='logout' className='dropdown-item'>
          Log Out
        </Link>
        <h1>Some text</h1>
      </div>
    </div>
  )
}

export default NavProfile
