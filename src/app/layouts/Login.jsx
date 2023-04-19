import React from 'react'
import { useParams } from 'react-router-dom'
import LoginForm from '../components/ui/LoginForm'
import RegisterForm from '../components/ui/RegisterForm'

const Login = () => {
  const { type } = useParams()
  const [formType, setFormType] = React.useState(
    type === 'register' ? type : 'login'
  )

  const toggleFormType = () => {
    setFormType((prev) => (prev === 'register' ? 'login' : 'register'))
  }

  return (
    <>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 shadow p-4'>
            {formType === 'register' ? (
              <>
                <h3 className='mb-4'>Register</h3>
                <RegisterForm />
                <p>
                  Already have account?{''}
                  <a role='button' onClick={toggleFormType}>
                    {''}
                    Sign in
                  </a>
                </p>
              </>
            ) : (
              <>
                <h3 className='mb-4'>Login</h3>
                <LoginForm />
                <p>
                  Do not have account?{''}
                  <a role='button' onClick={toggleFormType}>
                    {''}
                    Sign up
                  </a>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
