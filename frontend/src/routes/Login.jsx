import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = ({ setUser }) => {

  const initialData = {
    email:'',
    password:'',
  }

  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialData)
  const [errors, setErrors] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      const response = await fetch('/auth/login', {
        method:"POST",
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const json = await response.json()
      if(!response.ok){
        setErrors(json.err)
      }
      if(response.ok){
        setErrors(null)
        setFormData(initialData)
        const expirationTime = Date.now() + 3*24*60*60*1000
        const userData = { name: json.username, expirationTime }
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
        navigate('/')
      }
    } catch(err){
      console.log('error occured while login', err)
    }
  }

  return (
    <div className='mt-4'>
      <h1 className='text-center text-3xl font-extrabold text-blue-800 p-3'>Welcome Back! Login to Continue</h1>
      <form onSubmit={handleSubmit} id='logForms' className='border-2 border-black w-[500px] p-4 mx-auto flex flex-col gap-2'>
        <div>
          <label>Email-ID: </label>
          <input 
            type="email" 
            name='email'
            value= {formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password: </label>
          <input 
            type="password" 
            name='password'
            value= {formData.password}
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col gap-1 mt-3 items-center justify-center'>
          <button type='submit' className='bg-blue-700 text-white w-full p-1 rounded-md'>LOGIN</button>
          <div>
            <h3>not registered yet? &nbsp;
              <Link to='/register' className=' text-rose-800'>register</Link>
            </h3>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login