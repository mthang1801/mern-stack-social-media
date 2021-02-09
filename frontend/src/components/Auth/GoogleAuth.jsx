import React, {useState, useEffect} from 'react'
import GoogleLogin from 'react-google-login';
import useLanguage from "../Global/useLanguage"
const GGAuth = ({loginGoogle}) => {
  const [loginName, setLoginName] = useState("");
  const {i18n, lang} = useLanguage()
  useEffect(() => {
    setLoginName(i18n.store.data[lang].translation.auth.login);
  }, [lang, i18n.store.data, setLoginName])
  const responseGoogle = (response) => {
    console.log(response)
    const {googleId} = response;
    let {name,email} = response.profileObj;
    if(!name){
      name = `${response.profileObj.givenName} ${response.profileObj.familyName}` || "Người dùng mới"
    }
    loginGoogle(googleId,name,email)
  }
  return (
    <GoogleLogin
    clientId="660605287272-bcknbfn9c01uuf8rimiefiblh5587gij.apps.googleusercontent.com"    
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}    
    buttonText={loginName}
    prompt="select_account"    
  />
  )
}
// const mapDispatchToProps = dispatch => ({
//   loginGoogle : (id,name, email) => dispatch(loginGoogleStart(id, name, email))
// })
export default GGAuth
