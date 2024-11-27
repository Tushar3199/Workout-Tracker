import React, { useEffect, useState } from 'react'

const WorkoutForm = ({fetchWorkouts}) => {

  const initialData = {
    title:'',
    load:'',
    reps:'',
  }

  const [formData, setFormData] = useState(initialData)
  const [errors, setErrors] = useState(null)

  const handleChange = (e) =>{
    const{name, value} = e.target;
    setFormData({
      ...formData,
      [name]:value
    })
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      const response = await fetch('/api/workouts', {
        method:"POST",
        body: JSON.stringify(formData),
        headers:{
          'Content-Type':'application/json'
        }
      })
      const json = await response.json();
      if(!response.ok){
        setErrors(json.err)
      }
      if(response.ok){
        setFormData(initialData)
        setErrors(null)
        fetchWorkouts()
        console.log('new workout added!', json)
      }
    } catch (err) {
      console.log('error occured while submitting')
    }
  }

  return (
    <div className='p-3'>
      <h1 className='text-3xl font-bold text-center'>Add a Workout</h1>
      <form onSubmit={handleSubmit} id='workform' className='px-6 p-4 flex flex-col gap-3'>
        <div>
          <label>Title: </label>
          <input 
            type="text" 
            name="title"
            value={formData.title}
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Load(kg): </label>
          <input 
            type="text" 
            name="load"
            value={formData.load}
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Reps: </label>
          <input 
            type="text" 
            name="reps"
            value={formData.reps}
            onChange={handleChange} 
          />
        </div>
        <button type="submit" className='p-1 px-3 bg-green-700 text-white'>ADD</button>
      </form>
    </div>
  )
}

export default WorkoutForm