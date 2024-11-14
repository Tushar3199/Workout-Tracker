import { Router } from "express";
import { 
  createWorkout, 
  deleteWorkout, 
  getAllWorkouts, 
  getSingleWorkout, 
  updateWorkout 
} from "../controllers/workoutController.js";
const router = Router();

router.route('/')
.post(createWorkout)
.get(getAllWorkouts)

router.route('/:id')
.get(getSingleWorkout)
.patch(updateWorkout)
.delete(deleteWorkout)

export default router;