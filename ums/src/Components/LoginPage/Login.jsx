import React from 'react'
import "./Login.css"
export default function Login() {
  return (
    <div className='bg'>
        <div className='exp'><p>25 YEARS OF EXCELLENCE</p></div>

        <div className='clg'><p style={{color : "#16005D"}}><b>BEC</b></p></div>

        <div className='nba'><img src='NBA.png'></img></div>

        <div className='quote'><p>Scientists dream about doing great things.
          Engineers make them happen</p></div>

        <div className='Container' style={{backgroundColor:"#BBD2DC"}}>
            <p style={{fontSize :40}}>Login Portal</p>
            <form>
                <p style={{fontSize :20}}>Enter your credentials :</p><br></br>
                <input type='email'placeholder='Email' ></input><br></br>
                <input type="password" placeholder='Password' ></input><br></br>
                <a href='' style={{color:"#0021F4"}}>Forget Password?</a><br></br>
                <button>Login</button>
            </form>
            <p>*Your should be a member of this organization</p>
            <p>*use only official Email ID</p>
        </div>

    </div>
  )
}
