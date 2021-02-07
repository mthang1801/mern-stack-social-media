const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpire");
}

const login = (token, tokenExpire) => {  
  logout();
  localStorage.setItem("token", token);
  localStorage.setItem(
    "tokenExpire",
    new Date(Date.now() + tokenExpire * 1000)
  );
}

export {logout, login}