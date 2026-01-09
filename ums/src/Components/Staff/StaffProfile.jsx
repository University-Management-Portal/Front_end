import React from 'react'

export default function StaffProfile() {
  return (
    <div className='cart'>

        <img src="jdprofile1.jpg" alt="Profile" width={200} height={200} style={{borderRadius:"50%" , marginTop:"200px" , marginLeft:"200px"}}/>

        <div className="update-photo" style={{width:"100px" , height:"60px" , marginLeft:"240px" , color:"#16005D"}}><button>Update Photo</button></div>

        <button className="reset-button" style={{width:"160px" , height:"60px" , marginLeft:"240px" ,backgroundColor:"#16005D"}}>Reset Password</button>

        <div className="logout-button"  style={{width:"100px" , height:"60px" , marginLeft:"240px" , color:"#16005D"}}><button>Logout</button></div>
      
    </div>
  )
} 


