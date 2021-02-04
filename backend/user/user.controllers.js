import {User} from "./user.model"
import { UserInputError} from "apollo-server-express"
import {generateToken} from "../utils/token"
import bcrypt from "bcryptjs"
import getAuthUser from "../utils/getAuthUser"
export const userController = {
  users : () => User.find(),
  createUser : async (data ) => {      
      const {name, email, password} = data ; 
      if(!name){
        throw new UserInputError("Name is requried");
      }
      const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
      if(!emailRegex.test(email)){
        throw new UserInputError("Email is invalid");
      }
      if(password.length < 6){
        throw new UserInputError("Password is too short");
      }
      const checkUserExist = await User.findOne({email});
      if(checkUserExist){
        throw new UserInputError("Email has been existing");
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
        token : generateToken(newUser._id),
        tokenExpire : process.env.JWT_TOKEN_EXPIRE
      }
  },
  loginUser : async data => {
    const {email, password} = data;     
    const user = await User.findOne({email});
    
    if(!user){
      throw new UserInputError("email or password was not correct");;
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if(!comparePassword){
      throw new UserInputError("email or password was not correct"); 
    }
    return {
      user, 
      token : generateToken(user._id),
      tokenExpire : process.env.JWT_TOKEN_EXPIRE
    }
  },
  hidePassword : () => "***"
}