import React, { useState } from 'react';
import LHeader from '../LogHeader/LHeader';
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from '../../api/axiosInstance';
import { CircularProgress, Alert, Snackbar } from '@mui/material';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: 'info', open: false });
  const navigate = useNavigate();
  const [hover1, setHover1] = useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userType");

    if (token && userRole) {
      if (userRole === "staff") {
        navigate("/staff-dashboard", { replace: true });
      } else if (userRole === "student") {
        navigate("/student-dashboard", { replace: true });
      } else if (userRole === "admin") {
        navigate("/admin-dashboard", { replace: true });
      }
    }
  }, [navigate]);

  const handleUser = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage({ text: 'Please enter both email and password.', type: 'warning', open: true });
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post('/auth/login', {
        email: email,
        password: password
      });

      const { token, role, email: authEmail } = response.data;

      // Save token first so the next axiosInstance call relies on the interceptor
      localStorage.setItem("token", token);

      const userRole = role.toLowerCase();
      localStorage.setItem("userType", userRole);

      // STEP 2: Fetch the true userId from the user-service using the email
      console.log("LOGIN STEP 1 SUCCESS. Token received. Calling STEP 2 for email:", authEmail);
      try {
        const userResp = await axiosInstance.get(`/users/email/${authEmail}`);
        console.log("LOGIN STEP 2 SUCCESS. Response from user-service:", userResp.data);
        if (userResp.data && userResp.data.id) {
          localStorage.setItem("userId", userResp.data.id);
          if (userResp.data.profileImageUrl) {
            localStorage.setItem("profileImage", userResp.data.profileImageUrl);
          }
          if (userResp.data.department) {
            localStorage.setItem("userDepartment", userResp.data.department);
          }
          if (userResp.data.name) {
            localStorage.setItem("userName", userResp.data.name);
          }
          if (userResp.data.regNo) {
            localStorage.setItem("userRegNo", userResp.data.regNo);
          }
          console.log("TRUE USER ID SAVED:", userResp.data.id);
        } else {
          console.warn("User ID not found in user-service resp bounds.", userResp.data);
        }
      } catch (err) {
        console.error("LOGIN STEP 2 FAILED. true userId could not be fetched from user-service:");
        console.error(err);
        // If we fail here, we might still want to let them in, but profile will fail.
        // Or we can throw to block login. Let's let them in but log the error.
      }

      if (userRole === "staff") {
        navigate("/staff-dashboard");
      } else if (userRole === "student") {
        navigate("/student-dashboard");
      } else if (userRole === "admin") {
        navigate("/admin-dashboard");
      } else {
        setMessage({ text: 'Unknown user role returned from server.', type: 'error', open: true });
      }
    } catch (error) {
      console.error("Login Error:", error);
      let errorMessage = 'Invalid email or password';
      if (!error.response) {
        errorMessage = `Network Error: Cannot connect to API Gateway. Ensure backend is running. (${error.message})`;
      } else if (error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }

      setMessage({
        text: errorMessage,
        type: 'error',
        open: true
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <LHeader />

      <div className='w-screen h-screen relative bg-[url("/Collegepic.jpg")] bg-cover bg-center bg-no-repeat p-[40px_80px] overflow-hidden'>

        <div className='mt-[80px]'>
          <p className="text-[38px] font-bold text-white tracking-[1px]">
            25 YEARS OF EXCELLENCE
          </p>
        </div>

        <div className='mt-[15px]'>
          <p className="text-[58px] font-bold text-[#16005d]">
            BEC
          </p>
        </div>

        <div className='mt-[220px]'>
          <img src="NBA.png" alt="NBA" className="h-[60px]" />
        </div>

        <div className='max-w-[700px] mt-[20px]'>
          <p className="font-medium text-[30px] leading-[1.5] text-white">
            Scientists dream about doing great things. <br />
            Engineers make them happen
          </p>
        </div>

        <div className='absolute top-1/2 opacity-[0.7] right-[90px] -translate-y-1/2
          w-[440px] p-[40px] rounded-[22px]
          shadow-[0_25px_50px_rgba(0,0,0,0.25)]
          bg-gradient-to-r from-[#e3f2f5] to-[#b2d8e5] mt-[40px] '>

          <p className="text-[36px] font-bold mb-[35px] text-black text-center">
            Login Portal
          </p>

          <form onSubmit={handleUser}>
            <p className="text-[19px] text-black/80 font-medium mb-[12px]">
              Enter your credentials :
            </p>


            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full h-[50px] px-[15px] mb-[22px]
                rounded-[10px] border border-white
                bg-white/80
                text-black/80
                placeholder:text-black/50
                focus:outline-none focus:ring-2 focus:ring-[#16005d]/40
              "
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full h-[50px] px-[15px] mb-[10px]
                rounded-[10px] border border-white
                bg-white/80
                text-black/80
                placeholder:text-black/50
                focus:outline-none focus:ring-2 focus:ring-[#16005d]/40
              "
              required
            />

            <Link
              to="/forget-password"
              className="block text-right text-[14px] mb-[20px] hover:underline"
              style={{ color: "#0020ee" }}
            >
              Forget Password?
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="
                bg-[#16005d] text-white
                h-[42px] w-1/2
                rounded-[20px]
                text-[17px] font-semibold
                flex justify-center items-center mx-auto
                transition-all
                hover:bg-white hover:text-[#16005d]
                disabled:opacity-50
              "
              style={{
                backgroundColor: hover1 && !loading ? "#2d1a7a" : "#16005d",
                color: "#ffffff",
              }}
              onMouseEnter={() => setHover1(true)}
              onMouseLeave={() => setHover1(false)}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
            </button>
          </form>

          <p className="text-[14px] text-center mt-[14px] "
            style={{ color: "#240b88", fontWeight: "500" }}>
            *You should be a member of this organization
          </p>
          <p className="text-[14px] text-center mt-1 " style={{ color: "#290c9c", fontWeight: "500" }}>
            *Use only official Email ID
          </p>
        </div>
      </div>

      <Snackbar
        open={message.open}
        autoHideDuration={6000}
        onClose={() => setMessage({ ...message, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setMessage({ ...message, open: false })} severity={message.type} sx={{ width: '100%' }}>
          {message.text}
        </Alert>
      </Snackbar>
    </div>
  )
}
