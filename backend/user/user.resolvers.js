import {userController} from "./user.controllers"
export const userResolvers = {
  Query : {
    users : (_, args, ctx, info) => {
      return userController.users()
    },
    loginUser : (_, args, ctx, info) => {
      return userController.loginUser(args.data)
    },
    fetchCurrentUser : (_, args, {req}, info) => {     
      return userController.fetchCurrentUser(req)
    },
    fetchPersonalUser : (_, args, {req}, info)  => {
      return userController.fetchPersonalUser(req, args.slug)
    }
  },
  Mutation : {
    createUser : (_, args, ctx, info) => {
      return userController.createUser(args.data)
    }
  },
  User : {
    password : (_, args, ctx, info) => userController.hidePassword()
  }
}