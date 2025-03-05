import React from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import {login, signup } from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {

const [signState, setSignState] = React.useState("Sign In")
const [name, setName] = React.useState("");
const [email, setEmail] = React.useState("");
const [password, setPassword] = React.useState("");
const [loading, setLoding] = React.useState(false);


const user_auth = async (event) =>{
  event.preventDefault();
  setLoding(true);
  if(signState === "Sign In"){
    await login(email, password);
  }else{
    await signup(name, email, password);
  }
  setLoding(false);
}

  return (
    loading?<div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>:
    <div className='login'>
      <img src={logo} className='login-logo' alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState==="Sign Up"
          ?
          <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder='Your Name'/>:<></>}
          <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder='Email'/>
          <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder='password'/>
          <button onClick={user_auth} type='submit'>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox"/>
              <label htmlFor="" >Remember me</label>
            </div>
            <p>Need Help</p>
          </div>
        </form>
        <div className="form-switch">
          {signState==="Sign In" ? 
          <p>New to Netflix? <span onClick={()=>{setSignState("Sign Up")}} >Sign Up Now</span></p>
          :
          <p>Already have an account? <span onClick={()=>{setSignState("Sign In")}}>Sign In Now</span></p>}
        </div>
      </div>
    </div>
  )
}

export default Login
