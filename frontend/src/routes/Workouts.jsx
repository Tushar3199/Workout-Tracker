import React, { useEffect, useState } from 'react'
import WorkoutTitle from '../components/WorkoutTitle';
import WorkoutForm from '../components/WorkoutForm';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(()=>{

    const fetchWorkouts = async() =>{
      const response = await fetch('/api/workouts')
      const json = await response.json();
      if(response.ok){
        setWorkouts(json)
      }
    }

    fetchWorkouts();
  }, [])

  return (
    <div id='workpage' className='m-3 mt-5'>
      <div className='flex flex-col gap-3'>
        {workouts && workouts.map((workout)=>(
          <WorkoutTitle key={workout._id} workout={workout} />
        ))}
      </div>
      <div className=''>
        <WorkoutForm />
      </div>
    </div>
    
  )
}

export default Workouts