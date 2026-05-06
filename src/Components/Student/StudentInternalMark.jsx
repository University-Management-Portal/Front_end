import React, { useState, useEffect } from 'react'
import axiosInstance from '../../api/axiosInstance'

function StudentInternalMark() {
  const [marks, setMarks] = useState([])

  useEffect(() => {
    fetchMarks()
  }, [])

  const fetchMarks = async () => {
    try {
      const regNo = localStorage.getItem("userRegNo")
      if (!regNo) return

      const res = await axiosInstance.get(`/academic/marks/student/${encodeURIComponent(regNo)}`)
      setMarks(res.data)
    } catch (err) {
      console.error("Failed to fetch marks", err)
    }
  }

  return (
    <div className="p-[30px] min-h-[calc(100vh-80px)] bg-[#f6f7fb]">
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[28px]'>
        {marks.length > 0 ? marks.map((m, index) => (
          <div className="bg-white rounded-[20px] p-[24px_26px] h-[160px] shadow-[0_4px_10px_rgba(0,0,0,0.08)] transition-all duration-200 flex cursor-pointer hover:-translate-y-[4px] hover:shadow-[0_8px_18px_rgba(0,0,0,0.12)]" key={index} >
            <div className="flex flex-col justify-between w-full">
              <p className='text-[18px] font-bold text-[#16005d]'>{m.subject}</p>
              <p className="text-[20px] font-semibold text-[#333]">Internal Mark :<span className={`${m.totalMark < 20 ? "text-[#d32f2f]" : "text-[#1e7e34]"} `}> {parseFloat(m.totalMark).toFixed(1)}</span></p>
            </div>
          </div>
        )) : <p>No internal marks recorded yet.</p>}
      </div>
    </div>
  )
}

export default StudentInternalMark
