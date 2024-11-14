import React from 'react'

const WorkoutTitle = ({workout}) => {
  return (
    <div className='bg-gray-300 p-4 border-2 border-black rounded-lg'>
      <p className='font-semibold text-red-600'>{workout.title}</p>
      <p>{workout.load}</p>
      <p>{workout.reps}</p>
      <p>{workout.createdAt}</p>
    </div>
  )
}

export default WorkoutTitle