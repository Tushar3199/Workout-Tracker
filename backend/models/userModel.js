import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  age:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  }
},{ timestamps:true});

userSchema.statics.login = async function(email, password) { 
  const user = await this.findOne({ email }); 
  if (user) { 
    if (user.password === password) { 
      return user; 
    } else { 
      throw Error('Invalid password'); 
    } 
  } else { 
    throw Error('User not found, signup first!'); 
  }
}

const Users = mongoose.model('user', userSchema);

export default Users;