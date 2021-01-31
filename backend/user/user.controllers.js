import {User} from "./user.model"
import {CheckResultAndHandleErrors} from "apollo-server-express"
import {generateToken} from "../utils/token"
import bcrypt from "bcryptjs"
import getAuthUser from "../utils/getAuthUser"
export const userController = {
  users : () => User.find(),
  createUser : async (data ) => {
      const {name, email, password} = data ; 
      const checkUserExist = await User.findOne({email});
      if(checkUserExist){
        throw new CheckResultAndHandleErrors("Email has been existing");
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name , 
        email, 
        password : hashPassword
      })
      await newUser.save();
      return {
        user : newUser,
        token : generateToken(newUser._id)
      }
  },
  loginUser : async data => {
    const {email, password} = data;     
    const user = await User.findOne({email});
    
    if(!user){
      throw new CheckResultAndHandleErrors("email or password was not correct");;
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if(!comparePassword){
      throw new CheckResultAndHandleErrors("email or password was not correct"); 
    }
    return {
      user, 
      token : generateToken(user._id)
    }
  },
  hidePassword : () => "***"
}