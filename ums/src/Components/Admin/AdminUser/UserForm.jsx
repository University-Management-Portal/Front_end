import React, { useState } from "react";

const EMPTY_FORM = {
  id: "",
  rollno: "",
  name: "",
  year: "",
  dept: "",
  sec: "",
  phone: "",
  email: "",
  DOB: "",
  role: "student",
  designation: ""   
};



const rowStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
  marginBottom: "15px"
};

const inputStyle = {
  width: "100%",
  height: "35px",
  border: "2px solid #16005d",
  borderRadius: "6px",
  paddingLeft: "8px"
};

const labelStyle = {
  fontWeight: "600",
  marginBottom: "5px",
  display: "block"
};


function UserForm({ mode, editingUser, onSave, onClose }) {

  const [form, setForm] = useState(() => {
    if (mode === "edit" && editingUser) {
      return editingUser;
    }
    return EMPTY_FORM;
  });

  const [hoverSave, setHoverSave] = useState(false);
  const [hoverCancel, setHoverCancel] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!form.name) {
      alert("Name is required");
      return;
    }

    onSave({
      ...form,
      id: mode === "add" ? Date.now().toString() : form.id
    });
  };

  const renderFields = () => {
    switch (form.role) {

      case "student":
  return (
    <>
      <div style={rowStyle}>
        <div>
          <label style={labelStyle}>Roll No</label>
          <input name="rollno" value={form.rollno} onChange={handleChange} style={inputStyle}/>
        </div>

        <div>
          <label style={labelStyle}>Name</label>
          <input name="name" value={form.name} onChange={handleChange} style={inputStyle}/>
        </div>
      </div>

      <div style={rowStyle}>
        <div>
          <label style={labelStyle}>Year</label>
          <input name="year" value={form.year} onChange={handleChange} style={inputStyle}/>
        </div>

        <div>
          <label style={labelStyle}>Department</label>
          <input name="dept" value={form.dept} onChange={handleChange} style={inputStyle}/>
        </div>
      </div>

      <div style={rowStyle}>
        <div>
          <label style={labelStyle}>Section</label>
          <input name="sec" value={form.sec} onChange={handleChange} style={inputStyle}/>
        </div>

        <div>
          <label style={labelStyle}>Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} style={inputStyle}/>
        </div>
      </div>

      <div style={rowStyle}>
        <div>
          <label style={labelStyle}>Email</label>
          <input name="email" value={form.email} onChange={handleChange} style={inputStyle}/>
        </div>

        <div>
          <label style={labelStyle}>Date of Birth</label>
          <input type="date" name="DOB" value={form.DOB} onChange={handleChange} style={inputStyle}/>
        </div>
      </div>

      <div style={rowStyle}>
        <div>
          <label style={labelStyle}>Tutor</label>
          <input name="tutor" value={form.tutor} onChange={handleChange} style={inputStyle}/>
        </div>

        <div>
          <label style={labelStyle}>Address</label>
          <input type="text" name="address" value={form.address} onChange={handleChange} style={inputStyle}/>
        </div>
      </div>
    </>
  );

  case "staff":
  return (
    <>
      <div style={rowStyle}>
        <div>
          <label style={labelStyle}>Reg No</label>
          <input name="rollno" value={form.rollno} onChange={handleChange} style={inputStyle}/>
        </div>

        <div>
          <label style={labelStyle}>Name</label>
          <input name="name" value={form.name} onChange={handleChange} style={inputStyle}/>
        </div>
      </div>

      <div style={rowStyle}>
        <div>
          <label style={labelStyle}>Department</label>
          <input name="dept" value={form.dept} onChange={handleChange} style={inputStyle}/>
        </div>

        <div>
          <label style={labelStyle}>Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} style={inputStyle}/>
        </div>
      </div>

      <div style={rowStyle}>
        <div>
          <label style={labelStyle}>Email</label>
          <input name="email" value={form.email} onChange={handleChange} style={inputStyle}/>
        </div>

        <div>
          <label style={labelStyle}>Date of Birth</label>
          <input type="date" name="DOB" value={form.DOB} onChange={handleChange} style={inputStyle}/>
        </div>
      </div>

      <div style={rowStyle}>
        <div>
          <label style={labelStyle}>Date of Join</label>
          <input name="doj" value={form.doj} onChange={handleChange} style={inputStyle}/>
        </div>

        <div>
          <label style={labelStyle}>Area of Specilization</label>
          <input type="text" name="areaOfSpecialization" value={form.areaOfSpecialization} onChange={handleChange} style={inputStyle}/>
        </div>
      </div>

      <div style={rowStyle}>
        <div>
          <label style={labelStyle}>Designation</label>
          <select
          name="designation"
          value={form.designation}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Select Role</option>
          <option value="Assistant Professor">Assistant Professor</option>
          <option value="Professor">Professor</option>
          <option value="HOD">HOD</option>
        </select>
        </div>

        <div>
          <label style={labelStyle}>Address</label>
          <input type="text" name="address" value={form.address} onChange={handleChange} style={inputStyle}/>
        </div>
      </div>

    </>
  );

    case "admin":
  return (
    <>
      <div style={rowStyle}>
        <div>
          <label style={labelStyle}>Reg No</label>
          <input
            name="rollno"
            value={form.rollno}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>

      <div style={rowStyle}>
        <div>
          <label style={labelStyle}>Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>

      <div style={rowStyle}>
        <div>
          <label style={labelStyle}>College Name</label>
          <input
            name="collegeName"
            value={form.collegeName}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Office Location</label>
          <input
            name="officeLocation"
            value={form.officeLocation}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>

      <div style={rowStyle}>
        <div>
          <label style={labelStyle}>Date of Birth</label>
          <input
            type="date"
            name="DOB"
            value={form.DOB}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Address</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

      </div>
    </>
  );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-[1000] ">
      <div className="bg-white w-[540px] p-[20px] rounded-[12px]">

        <h3 className="text-center text-lg font-semibold mb-4">
          {mode === "add" ? "Add User" : "Edit User"}
        </h3>

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          style={{
            border:"2px solid #16005d",
            fontWeight:"500",
          }}
        >
          <option value="student">Student</option>
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>

        <div className="grid grid-cols-1 gap-3">
          {renderFields()}
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
  onClick={handleSubmit}
  onMouseEnter={() => setHoverSave(true)}
  onMouseLeave={() => setHoverSave(false)}
  style={{
    padding: "6px 14px",
    borderRadius: "10px",
    border: "2px solid #16005d",
    cursor: "pointer",
    fontWeight: "500",
    transition: "0.3s",

    backgroundColor: hoverSave ? "#16005d" : "#ffffff",
    color: hoverSave ? "#ffffff" : "#16005d",
  }}
>
  Save
</button>

<button
  onClick={onClose}
  onMouseEnter={() => setHoverCancel(true)}
  onMouseLeave={() => setHoverCancel(false)}
  style={{
    padding: "6px 14px",
    borderRadius: "10px",
    border: "2px solid #16005d",
    cursor: "pointer",
    fontWeight: "500",
    transition: "0.3s",

    backgroundColor: hoverCancel ? "#16005d" : "#ffffff",
    color: hoverCancel ? "#ffffff" : "#16005d",
  }}
>
  Cancel
</button>
        </div>

      </div>
    </div>
  );
}

export default UserForm;
