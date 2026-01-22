import React, { useState } from 'react'
import LogHeader from '../LogHeader/LHeader';
import '../LoginPage/LoginPage.css';
import '../LoginPage/ForgetPassword.css';
import './ResultPage.css';

function ResultPage() {
    const[regNo,setRegNo] = useState("");
    const [dob,setDob] = useState("");

    const handleClick=()=>{
        if(!regNo || !dob){
            alert("Please fill all fields")
            return ;
        }
    }

  return (
    <div className='bg'>
        <LogHeader/>
        <div className='result-cointainer'>
            <div className='result-card' style={{backgroundColor:"#BBD2DC"}}>
                <p>Result</p>
                <form>
                    <p>Enter your credentials :</p>
                    <input type='text' placeholder='Register Number' onChange={(e)=>{setRegNo(e.target.value)}}></input><br></br>
                    <input type='text' placeholder='DOB (DD/MM/YYYY)' onChange={(e)=>{setDob(e.target.value)}}></input><br></br>
                    <button type='submit' onClick={handleClick}>Submit</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ResultPage