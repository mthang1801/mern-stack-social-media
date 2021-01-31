import {userController} from "./user.controllers"
export const userResolvers = {
  Query : {
    users : (_, args, ctx, info) => {
      return userController.users()
    },
    loginUser : (_, args, ctx, info) => {
      return userController.loginUser(args.data)
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