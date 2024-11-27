import Workouts from "../models/workoutModel.js";

export const createWorkout = async(req, res) =>{
  const {title, load, reps} = req.body;
  const userId = req.user_id
  try {
    const workout = await Workouts.create({title, load, reps, userId});
    return res.status(201).json(workout)
  } catch (err) {
    res.status(400).json(err)
  }
}

export const getAllWorkouts = async(req, res) =>{
  const userId = req.user_id
  try{
    const allWorkouts = await Workouts.find({ userId });
    return res.status(200).json(allWorkouts);
  }catch(err){
    res.status(400).json(err)
  }
}


export const getSingleWorkout = async(req, res) =>{
  try {
    const workout = await Workouts.findById(req.params.id);
    return res.status(200).json(workout);
  } catch (err) {
    res.status(400).json(err)
  }
}


export const updateWorkout = async(req, res) =>{
  const {title, load, reps} = req.body;
  const id = req.params.id;
  try {
    const workout = await Workouts.findByIdAndUpdate(id, {title, load, reps}, {new:true})
    return res.status(201).json(workout)
  } catch (err) {
    res.status(400).json(err)
  }
}


export const deleteWorkout = async(req, res) =>{
  const id = req.params.id;
  try {
    const workout = await Workouts.findByIdAndDelete(id)
    return res.status(200).json(workout)
  } catch (err) {
    res.status(400).json(err)
  }
}

