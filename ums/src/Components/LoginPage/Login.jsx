import React from 'react'
import "./Login.css"
import "./LoginPage.css"
import LHeader from '../LogHeader/LHeader'
import {Link} from "react-router-dom"

export default function Login() {
  return (
    <div>
      <LHeader/>
      <div className='bg'>
          <div className='exp'><p>25 YEARS OF EXCELLENCE</p></div>

          <div className='clg'><p style={{color : "#16005D"}}><b>BEC</b></p></div>

          <div className='nba'><img src='NBA.png'></img></div>

          <div className='quote'><p>Scientists dream about doing great things.
            Engineers make them happen</p></div>

          <div className='Login-card' style={{backgroundColor:"#BBD2DC"}}>
              <p style={{fontSize :40}}>Login Portal</p>
              <form>
                  <p style={{fontSize :20}}>Enter your credentials :</p><br></br>
                  <input type='email' name='email' placeholder='Email' ></input><br></br>
                  <input type="password" name='password' placeholder='Password' ></input><br></br>
                  <Link to = "/forget-password" className='fp'>Forget Password?</Link><br></br>
                  <button>Login</button>
              </form>
              <p>*Your should be a member of this organization</p>
              <p>*use only official Email ID</p>
          </div>
      </div>
    </div>
  )
}
