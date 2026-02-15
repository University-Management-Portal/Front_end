const departments = {
  CSE: ["Computer Networks", "Data Structures", "Advanced Algorithms"],
  IT: ["Database Management System", "Operating System", "Cloud Computing"],
  EEE: ["Power Systems", "Electrical Machines", "Control Systems"]
};

const sections = ["A", "B"];

const generateStudents = (prefix) => {
  const students = [];
  for (let i = 1; i <= 30; i++) {
    students.push({
      roll: `${prefix}${String(i).padStart(3, "0")}`,
      name: `Student${i}`,
      status: Math.random() > 0.2 ? "Present" : "Absent"
    });
  }
  return students;
};

const generateDates = () => {
  const dates = [];
  for (let d = 8; d <= 14; d++) {
    dates.push(`${String(d).padStart(2, "0")}-02-2026`);
  }
  return dates;
};

const buildAttendance = () => {
  const data = {};

  Object.keys(departments).forEach((dept) => {
    data[dept] = {};

    sections.forEach((sec) => {
      const records = [];

      generateDates().forEach((date) => {
        departments[dept].forEach((subject) => {
          records.push({
            date,
            subject,
            students: generateStudents(
              dept === "CSE"
                ? "21CS"
                : dept === "IT"
                ? "21IT"
                : "21EE"
            )
          });
        });
      });

      data[dept][sec] = records;
    });
  });

  return data;
};

const AttendanceData = {
  "2025-2026": {
    "5": buildAttendance()
  }
};

export default AttendanceData;
