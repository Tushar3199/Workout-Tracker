import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true,
  },
  load:{
    type:String,
    required:true,
  },
  reps:{
    type:String,
    required:true,
  }
}, {timestamps:true});

const Workouts = mongoose.model('workout', workoutSchema);

export default Workouts;