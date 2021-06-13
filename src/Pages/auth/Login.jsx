import { useContext, useRef } from "react";
import "./login.css";
import {LoginCall} from '../../apiCalls'
import { AuthContext } from "../../context/Authcontext";
import {CircularProgress} from '@material-ui/core'

export default function Login() {
  const email = useRef()
  const password = useRef()
  const {user,isFecthing,dispatch}=useContext(AuthContext)
  const handlClick =(e)=>{
    e.preventDefault()
    LoginCall({email:email.current.value,password:password.current.value},dispatch)
  }
  console.log(user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Instagram</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Instagram.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handlClick}>
            <input placeholder="Email" type="email" className="loginInput" ref={email} required/>
            <input placeholder="Password" type="password" className="loginInput" ref={password} required minLength="6"/>
            <button className="loginButton" type="submit" disabled={isFecthing}>{isFecthing?<CircularProgress color="secondary" size="22px"/>:"Log In"}</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton" disabled={isFecthing}>
              {isFecthing?<CircularProgress color="primary" size="22px"/>:"Create a New Account"} 
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}