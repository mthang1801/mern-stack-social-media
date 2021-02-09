import {client} from "../apollo/client"
const logout = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpire");
  await client.clearStore();
}

const login = async (token, tokenExpire) => {  
  logout();
  localStorage.setItem("token", token);
  localStorage.setItem(
    "tokenExpire",
    new Date(Date.now() + tokenExpire * 1000)
  );
  await client.resetStore();
}

export {logout, login}