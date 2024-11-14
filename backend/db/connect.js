import mongoose from "mongoose";

export const connectMongoDB = async(url) =>{
  return (
    mongoose.connect(url)
    .then(()=>{console.log('MongoDB connected!!')})
    .catch(err=>console.log('MongoErr', err))
  )
}