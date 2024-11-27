import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Register = ({setUser}) => {

  const initialData = {
    name:'',
    age:'',
    email:'',
    password:''
  }
  const navigate = useNavigate()

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState(null)

  const handleChange = (e) =>{
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      const response = await fetch('/auth/register',{
        method:"POST",
        body: JSON.stringify(formData),
        headers: {
          'Content-Type':'application/json'
        },
        credentials: 'include',
      })
      const json = await response.json();
      if(!response.ok){
        setErrors(json.err)
      }
      if(response.ok){
        setErrors(null)
        setFormData(initialData)
        const expirationTime = Date.now() + 3*24*60*60*1000;
        const userData = { name: json.username, expirationTime };
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
        navigate('/')
      }
    } catch (err) {
      console.log('error occured while registering the user')
    }
  }

  return (
    <div className='mt-4'>
      <h1 className='text-center text-3xl font-extrabold text-purple-800 p-3'>New here? Register Now!</h1>
      <form onSubmit={handleSubmit} id='logForms' className='border-2 border-black w-[500px] p-4 mx-auto flex flex-col gap-2'>
      <div>
          <label>Full Name: </label>
          <input 
            type="text" 
            name='name'
            value= {formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Age: </label>
          <input 
            type="text" 
            name='age'
            value= {formData.age}
            onChange={handleChange}
          />
        </div>
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
        <div className='flex flex-col gap-1 mt-3 items-center'>
          <button type='submit' className='bg-purple-700 text-white w-full p-1 rounded-md'>REGISTER</button>
          <div>
            <h3>already registered? &nbsp;
              <Link to='/login' className=' text-rose-800'>login</Link>
            </h3>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Register