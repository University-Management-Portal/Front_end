import React, { useState } from "react";

const AdminSettings = () => {

  const [settings, setSettings] = useState({
    universityName: "Campus Connect University",
    academicYear: "2024-2025",
    semester: "Fall 2024",

    smtpServer: "smtp.university.edu",
    port: "587",
    fromEmail: "noreply@university.edu",

    studentRegistration: true,
    allowStaffRegistration: false,
    emailNotifications: true,

    attendanceMinPercentage: 75,
    lateEntryTime: "09:15",
    autoAttendance: true,

    internalMaxMark: 50,
    passMark: 40,
    gradeSystem: "REGULATION_2021",

    enableSMS: true,
    feeReminder: true,

    sessionTimeout: 30,
    twoFactorAuth: false,
    loginAttempts: 5,

    semesterStart: "2024-07-01",
    semesterEnd: "2024-11-30",

    autoBackup: true,
    maintenanceMode: false,
  });

  const [hover1, setHover1] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saved Settings:", settings);
    alert("Settings Saved Successfully!");
  };

  return (
    <div className="min-h-screen bg-[#16005d] p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">System Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-6">

{/* ================= GENERAL ================= */}

        <div className="bg-[#ffffff] p-5 rounded-xl">
          <h3 className="text-xl font-semibold mb-4 text-[#16005d]">General Settings</h3>

          <label className="block mb-2 text-[#16005d]">University Name</label>
          <input
            name="universityName"
            value={settings.universityName}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#16005d]"
          />

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block mb-2 text-[#16005d]">Academic Year</label>
              <select name="academicYear" value={settings.academicYear}
                onChange={handleChange}
                className="w-full p-2 rounded bg-[#16005d]">
                <option>2023-2024</option>
                <option>2024-2025</option>
                <option>2025-2026</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-[#16005d]">Semester</label>
              <select name="semester" value={settings.semester}
                onChange={handleChange}
                className="w-full p-2 rounded bg-[#16005d]">
                <option>Fall 2024</option>
                <option>Spring 2025</option>
              </select>
            </div>
          </div>
        </div>

{/* ================= ATTENDANCE ================= */}

        <div className="bg-[#ffffff] p-5 rounded-xl">
          <h3 className="text-xl font-semibold mb-4 text-[#16005d]">Attendance Settings</h3>

          <label className="block mb-2 text-[#16005d]">Minimum Attendance %</label>
          <input
            name="attendanceMinPercentage"
            value={settings.attendanceMinPercentage}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#16005d]"
          />

          <label className="block mb-2 mt-3 text-[#16005d]">Late Entry Time</label>
          <input
            type="time"
            name="lateEntryTime"
            value={settings.lateEntryTime}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#16005d]"
          />

          <div className="flex justify-between mt-3">
            <span className="text-[#16005d]">Auto Attendance Calculation</span>
            <input
              type="checkbox"
              name="autoAttendance"
              checked={settings.autoAttendance}
              onChange={handleChange}
            />
          </div>
        </div>

{/* ================= EXAM ================= */}

        <div className="bg-[#ffffff] p-5 rounded-xl">
          <h3 className="text-xl font-semibold mb-4 text-[#16005d]">Exam & Marks</h3>

          <label className="block mb-2 text-[#16005d]">Internal Max Mark</label>
          <input
            name="internalMaxMark"
            value={settings.internalMaxMark}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#16005d]"
          />

          <label className="block mb-2 mt-3 text-[#16005d]">Pass Mark</label>
          <input
            name="passMark"
            value={settings.passMark}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#16005d]"
          />
        </div>

{/* ================= SECURITY ================= */}

        <div className="bg-[#ffffff] p-5 rounded-xl">
          <h3 className="text-xl font-semibold mb-4 text-[#16005d]">Security</h3>

          <label className="block mb-2 text-[#16005d]">Session Timeout (min)</label>
          <input
            name="sessionTimeout"
            value={settings.sessionTimeout}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#16005d]"
          />

          <div className="flex justify-between mt-3">
            <span className="text-[#16005d]">Two Factor Authentication</span>
            <input
              type="checkbox"
              name="twoFactorAuth"
              checked={settings.twoFactorAuth}
              onChange={handleChange}
            />
          </div>
        </div>

{/* ================= NOTIFICATION ================= */}

        <div className="bg-[#ffffff] p-5 rounded-xl">
          <h3 className="text-xl font-semibold mb-4 text-[#16005d]">Notifications</h3>

          <div className="flex justify-between">
            <span className="text-[#16005d]">Enable SMS</span>
            <input type="checkbox" name="enableSMS"
              checked={settings.enableSMS}
              onChange={handleChange} />
          </div>

          <div className="flex justify-between mt-3">
            <span className="text-[#16005d]">Fee Reminder</span>
            <input type="checkbox" name="feeReminder"
              checked={settings.feeReminder}
              onChange={handleChange} />
          </div>
        </div>

{/* ================= SAVE ================= */}

        <div className="text-right">
          <button
            className="px-6 py-2 rounded-lg font-semibold"
            style={{
              backgroundColor: hover1 ? "#16005d" : "#ffffff",
              color: hover1 ? "#ffffff" : "#16005d"
            }}
            onMouseEnter={() => setHover1(true)}
            onMouseLeave={() => setHover1(false)}
          >
            Save Settings
          </button>
        </div>

      </form>
    </div>
  );
};

export default AdminSettings;
