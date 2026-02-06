import React, { useState } from 'react'
import { BsPlusLg, BsThreeDotsVertical } from "react-icons/bs";
import { useLocation } from "react-router-dom";

export default function StaffAssignment() {

  const location = useLocation();
  const { subject, dept } = location.state || {};
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);

  const [assignments, setAssignments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [file, setFile] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);


  const getStatus = (due) => {
    const today = new Date();
    return new Date(due) >= today ? "OPEN" : "CLOSED";
  };

  const handleAdd = () => {
    if (!title || !dueDate || !file) {
      alert("All fields required");
      return;
    }
    const fileUrl = URL.createObjectURL(file);
    setAssignments([
      ...assignments,
      {
        id: Date.now(),
        title,
        dueDate,
        file,
        fileUrl,
        enabled: true
      }
    ]);

    setTitle('');
    setDueDate('');
    setFile(null);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  const toggleEnable = (id) => {
    setAssignments(assignments.map(a =>
      a.id === id ? { ...a, enabled: !a.enabled } : a
    ));
  };

  return (
    <div className="min-h-screen p-[40px] flex justify-center bg-[#f4f6fb]">
      <div className="w-full max-w-[1000px]">

        <div className="flex items-center justify-between py-[10px]">
          <p className="text-[16px] font-medium text-[#16005D]">
            {dept} / {subject} / Assignment
          </p>

          <button className="flex items-center gap-[8px] p-[8px_14px] rounded-[6px] std-btn" onClick={() => setShowForm(!showForm)}
            style={{
              backgroundColor: hover1 ? "#ffffff" : "#16005d",
              color: hover1 ? "#16005d" : "#ffffff"
            }}
            onMouseEnter={() => setHover1(true)}
            onMouseLeave={() => setHover1(false)}
            >
            <BsPlusLg /> Add Assignment
          </button>
        </div>


        {showForm && (
          <div className="bg-white rounded-[10px] flex gap-[20px] items-center flex-wrap mb-[30px] w-full p-[20px] mt-[20px]">
            <input
              type="text"
              placeholder="Assignment Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="p-[8px] rounded-[6px] border border-[#ccc] text-[14px] w-[200px]"
            />

            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className="p-[8px] rounded-[6px] border border-[#ccc] text-[14px] w-[180px] ml-[20px]"
            />

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={e => setFile(e.target.files[0])}
              className="p-[8px] rounded-[6px] border border-[#ccc] text-[14px] w-[280px] ml-[20px]"
            />

            <button className="std-btn p-[8px_16px] rounded-[6px] w-[100px] ml-[80px]" onClick={handleAdd}
              style={{
                backgroundColor: hover2 ? "#ffffff" : "#16005d",
                color: hover2 ? "#16005d" : "#ffffff"
              }}
              onMouseEnter={() => setHover2(true)}
              onMouseLeave={() => setHover2(false)}
              >
              Add
            </button>
          </div>
        )}


        {assignments.length === 0 ? (
          <div className="text-center mt-[80px] text-gray-500 text-[16px]">No Assignments Here 📄</div>
        ) : (
          <table className="w-full bg-white rounded-[10px] overflow-visible border-collapse">
            <thead>
              <tr className="bg-[#e5e7eb]">
                <th className="p-[14px] text-left text-[#16005D]">Title</th>
                <th className="p-[14px] text-left text-[#16005D]">Due Date</th>
                <th className="p-[14px] text-left text-[#16005D]">Status</th>
                <th className="p-[14px] text-left text-[#16005D]">Actions</th>
              </tr>
            </thead>

            <tbody>
              {assignments.map((a, index) => (
                <tr key={a.id} className={`${!a.enabled ? "opacity-50" : ""} even:bg-[#f9fafb]`}>
                  <td className="p-[14px] text-left text-[#16005D]">{a.title}</td>
                  <td className="p-[14px] text-left text-[#16005D]">{a.dueDate}</td>

                  <td className={`p-[14px] text-left ${getStatus(a.dueDate) === "OPEN" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}`}>
                    {getStatus(a.dueDate)}
                  </td>

                  <td className="relative cursor-pointer p-[14px] text-left text-[#16005D]">
                    <BsThreeDotsVertical
                      onClick={() =>
                        setActiveMenu(activeMenu === index ? null : index)
                      }
                    />

                    {activeMenu === index && (
                      <div className="absolute right-0 top-[20px] bg-white shadow-[0_4px_10px_rgba(0,0,0,0.1)] rounded-[6px] z-10 w-[100px]">
                        <p className="p-[8px_14px] cursor-pointer hover:bg-[#f1f5f9]" onClick={() => window.open(a.fileUrl, "_blank")}>
                          View
                        </p>

                        <p className="p-[8px_14px] cursor-pointer hover:bg-[#f1f5f9]" onClick={() => toggleEnable(a.id)}>
                          {a.enabled ? "Disable" : "Enable"}
                        </p>
                        <p className="p-[8px_14px] cursor-pointer hover:bg-[#f1f5f9] text-red-600" onClick={() => handleDelete(a.id)}>Delete</p>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </div>
  )
}
