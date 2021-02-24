import {gql} from "@apollo/client";

export const SIGNUP = gql`
  mutation SignUp($name : String!, $email: String!, $password: String!){
    createUser(data : {
      name : $name
      email : $email
      password : $password
    }){
      user{
        _id
        name
        email
      }
      token
      tokenExpire
    }
  }
`