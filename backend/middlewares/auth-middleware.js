import jwt from 'jsonwebtoken'
import Users from '../models/userModel.js'

export const isLoggedIn = (req, res, next) =>{
  const token = req.cookies.jwt;
  if(token){
    jwt.verify(token, process.env.JWT_SECRET, async(err, data)=>{
      if(err){
        res.status(403).json({errMsg:'invalid token'})
      }else{
        try{
          const user = await Users.findById(data.id)
          if(!user){
            res.status(400).json({errMsg:'user not found!'})
          }
          req.user_id = user._id;
          req.username = user.name;
          next();

        }catch(err){
          console.error('Error fetching user:', err); 
          res.status(500).json({ errMsg: 'Failed to authenticate user' });
        }
      }
    })
  }else{
    res.status(404).json({errMsg:'token not found'})
  }
}