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
    emailNotifications: true,
    maintenanceMode: false,
  });

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
    <div className="min-h-screen bg-purple-900 p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">System Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* General Settings */}
        <div className="bg-purple-800 p-5 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">General Settings</h3>

          <label className="block mb-2">University Name</label>
          <input
            type="text"
            name="universityName"
            value={settings.universityName}
            onChange={handleChange}
            className="w-full p-2 rounded bg-purple-700 border border-purple-600"
          />

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block mb-2">Academic Year</label>
              <select
                name="academicYear"
                value={settings.academicYear}
                onChange={handleChange}
                className="w-full p-2 rounded bg-purple-700 border border-purple-600"
              >
                <option>2023-2024</option>
                <option>2024-2025</option>
                <option>2025-2026</option>
              </select>
            </div>

            <div>
              <label className="block mb-2">Current Semester</label>
              <select
                name="semester"
                value={settings.semester}
                onChange={handleChange}
                className="w-full p-2 rounded bg-purple-700 border border-purple-600"
              >
                <option>Spring 2024</option>
                <option>Fall 2024</option>
                <option>Spring 2025</option>
              </select>
            </div>
          </div>
        </div>

        {/* Email Config */}
        <div className="bg-purple-800 p-5 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Email Configuration</h3>

          <label className="block mb-2">SMTP Server</label>
          <input
            type="text"
            name="smtpServer"
            value={settings.smtpServer}
            onChange={handleChange}
            className="w-full p-2 rounded bg-purple-700 border border-purple-600"
          />

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block mb-2">Port</label>
              <input
                type="text"
                name="port"
                value={settings.port}
                onChange={handleChange}
                className="w-full p-2 rounded bg-purple-700 border border-purple-600"
              />
            </div>

            <div>
              <label className="block mb-2">From Email</label>
              <input
                type="email"
                name="fromEmail"
                value={settings.fromEmail}
                onChange={handleChange}
                className="w-full p-2 rounded bg-purple-700 border border-purple-600"
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-purple-800 p-5 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">System Preferences</h3>

          <div className="flex justify-between items-center mb-3">
            <span>Enable Student Registration</span>
            <input
              type="checkbox"
              name="studentRegistration"
              checked={settings.studentRegistration}
              onChange={handleChange}
              className="w-5 h-5"
            />
          </div>

          <div className="flex justify-between items-center mb-3">
            <span>Email Notifications</span>
            <input
              type="checkbox"
              name="emailNotifications"
              checked={settings.emailNotifications}
              onChange={handleChange}
              className="w-5 h-5"
            />
          </div>

          <div className="flex justify-between items-center">
            <span>Maintenance Mode</span>
            <input
              type="checkbox"
              name="maintenanceMode"
              checked={settings.maintenanceMode}
              onChange={handleChange}
              className="w-5 h-5"
            />
          </div>
        </div>

        <div className="text-right">
          <button className="bg-green-500 px-6 py-2 rounded-lg font-semibold hover:bg-green-600">
            Save Settings
          </button>
        </div>

      </form>
    </div>
  );
};

export default AdminSettings;
