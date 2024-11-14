import Users from "../models/userModel.js";
import { createToken, maxAge } from "../utils/tokenCreator.js";

export const post_reg = async(req, res) => {
  const {name, age, email, password} = req.body;
  try {
    const user = await Users.create({name, age, email, password});
    const token = createToken(user._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000})
    res.status(200).json({ token, user_id: user._id, username: user.name, message: 'Registration successful' }); 
  } catch (err) {
    res.status(400).json(err)
  }
}

export const post_log = async(req, res) => {
  const {email, password} = req.body;
  try {
    const user = await Users.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000});
    res.status(200).json({ token, user_id: user._id, username: user.name, message: 'Login successful' }); 
  } catch (err) { 
    console.error('Error logging in user:', err);  
    res.status(400).json({ error: 'Login failed', message: err.message }); 
  }
}

export const do_logout = async(req, res) =>{
  res.cookie('jwt', '', {httpOnly: true, maxAge: 1});
  return res.status(200).json({ message: 'Logged out successfully' });
}