import axios from 'axios';
import {useRef} from 'react'
import { useHistory } from 'react-router';
import "./register.css";

export default function Register() {
  const username = useRef()
  const email = useRef()
  const password = useRef()
  const passwordAgain = useRef()
  const history=useHistory()

  const handlClick =async(e)=>{
    e.preventDefault()
    if(passwordAgain.current.value !== password.current.value){
      password.current.setCustomValidity("password doesn't matched")
    }else{
      const user={
        username:username.current.value,
        email:email.current.value,
        password:password.current.value,
      }
      try {
        await axios.post("/auth/register",user)
        history.push('/login')
      } catch (error) {
        console.warn(error)
      }
    }
  }
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
            <input placeholder="Username" className="loginInput" ref={username} required />
            <input placeholder="Email" className="loginInput" ref={email} required type="email"/>
            <input placeholder="Password" className="loginInput" ref={password} required type="password" minLength="6"/>
            <input placeholder="Password Again" className="loginInput" ref={passwordAgain} required type="password" minLength="6"/>
            <button className="loginButton" type="submit">Sign Up</button>
            <button className="loginRegisterButton">
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}