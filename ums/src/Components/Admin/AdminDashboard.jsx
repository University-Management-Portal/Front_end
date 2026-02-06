import React from 'react'
import ProfCalender from '../Common/ProfCalender'

function AdminDashboard() {
  return (
    <div className='p-[30px] bg-[#f7f8fc] grid grid-cols-4 gap-[22px] min-h-screen'>
      <div className='col-span-4 bg-[#16005d] text-white p-[30px] rounded-[14px] flex flex-col justify-center h-[160px] mb-0'>
        <p className="text-[32px] font-bold">Admin Dashboard</p>
      </div>

      <div className='bg-[#e0e0e0] text-white p-[20px_12px] rounded-[16px] flex flex-col items-center justify-center shadow-[0_6px_14px_rgba(0,0,0,0.18)] transition-all duration-300 h-[140px] hover:scale-[1.03] hover:shadow-[0_18px_38px_rgba(0,0,0,0.35)]'>
        <p className="text-[24px] font-semibold mb-[6px] text-black">Total Student</p>
        <p className="text-[32px] font-bold text-black tracking-[1px]">7456</p>
      </div>
      <div className='bg-[#e0e0e0] text-white p-[20px_12px] rounded-[16px] flex flex-col items-center justify-center shadow-[0_6px_14px_rgba(0,0,0,0.18)] transition-all duration-300 h-[140px] hover:scale-[1.03] hover:shadow-[0_18px_38px_rgba(0,0,0,0.35)]'>
        <p className="text-[24px] font-semibold mb-[6px] text-black">Total Faculties</p>
        <p className="text-[32px] font-bold text-black tracking-[1px]">753</p>
      </div>
      <div className='bg-[#e0e0e0] text-white p-[20px_12px] rounded-[16px] flex flex-col items-center justify-center shadow-[0_6px_14px_rgba(0,0,0,0.18)] transition-all duration-300 h-[140px] hover:scale-[1.03] hover:shadow-[0_18px_38px_rgba(0,0,0,0.35)]'>
        <p className="text-[24px] font-semibold mb-[6px] text-black">Departments</p>
        <p className="text-[32px] font-bold text-black tracking-[1px]">14</p>
      </div>
      <div className='bg-[#e0e0e0] text-white p-[20px_12px] rounded-[16px] flex flex-col items-center justify-center shadow-[0_6px_14px_rgba(0,0,0,0.18)] transition-all duration-300 h-[140px] hover:scale-[1.03] hover:shadow-[0_18px_38px_rgba(0,0,0,0.35)]'>
        <p className="text-[24px] font-semibold mb-[6px] text-black">Total Courses</p>
        <p className="text-[32px] font-bold text-black tracking-[1px]">187</p>
      </div>

      <div className='col-span-4 max-h-[95vh] overflow-hidden'>
        <ProfCalender />
      </div>

    </div>
  )
}

export default AdminDashboard