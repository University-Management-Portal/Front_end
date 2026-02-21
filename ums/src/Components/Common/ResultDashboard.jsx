import React, { useState, useRef,  useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileData from "../Student/Studentdata";

export default function ResultDashboard() {
  const [open, setOpen] = useState(false);
  const [dateTime, setDateTime] = useState("");
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);

  const name = ProfileData.find(item => item.label === "Name")?.value;
  const regNo = ProfileData.find(item => item.label === "Reg No")?.value;

  const handleSemClick = (sem) => {
    setOpen(false);
    navigate("/result-view", { state: { semester: sem } });
  };

  const handleLogout = () => {
    setOpen(false);
    navigate("/");
  };

  useEffect(() => {
  function handleClickOutside(event) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formatted = now.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
      setDateTime(formatted);
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="div">
    <div className="bg-[#16005d] text-white flex justify-between items-center px-6 py-3 h-[90px]">

      <div className="relative flex items-center gap-[880px]" >
     

        <img
          src="logo.jpeg"
          alt="College"
          className="h-[55px] w-[250px] mt-[6px] ml-[10px] mr-[20px] rounded-[6px]"
        />

        <div className="text-right">
            <p className="text-[16px] font-medium">
            {dateTime}
            </p>

            <p className="mt-1  text-[18px]">
            <span className="text-white-600 font-semibold">
                {name}
            </span>{" "}
            ({regNo})
            </p>
        </div>
        
      </div>

    </div>

    <div className="flex items-center justify-between px-8 py-4">

            <div className="relative" ref={dropdownRef}>
                <button
                onClick={() => setOpen(!open)}
                className="font-semibold"
                  style={{
                  backgroundColor: hover1 ? "#2d1a7a" : "#16005d",
                  color:"#ffffff",
                }}
                onMouseEnter={() => setHover1(true)}
                onMouseLeave={() => setHover1(false)}
                >
                Marksheet ▾
                </button>

                {open && (
                <div className="absolute left-0 mt-2 bg-white text-black rounded shadow-md w-40 z-50">
                    {[1,2,3,4,5,6,7,8].map((sem) => (
                    <div
                        key={sem}
                        onClick={() => handleSemClick(sem)}
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  
                    >
                        Semester {sem}
                    </div>
                    ))}
                </div>
                )}
            </div>

            <button
                className="font-semibold"
                onClick={handleLogout}
                style={{
                  backgroundColor: hover2 ? "#2d1a7a" : "#16005d",
                  color:"#ffffff",
                }}
                onMouseEnter={() => setHover2(true)}
                onMouseLeave={() => setHover2(false)}

            >
                Logout
            </button>

    </div>

    </div>
    
  );
}


    