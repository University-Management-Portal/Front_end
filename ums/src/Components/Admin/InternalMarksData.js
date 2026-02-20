import studentsData from "../Staff/StudentList.js";

// subjects per department
const subjectsByDept = {
  CSE: ["DBMS", "OS", "DSA"],
  IT: ["DBMS", "OS", "CN", "AA"],
  EEE: ["Circuit Diagram", "Solid Mechanics", "Digital Logic Circuit"],
  Mech: ["Mechanism", "Thermodynamics", "Strength of Materials"],
};

// helper: create subject-wise student marks
const createSubjectsWithMarks = (students, subjects) => {
  return subjects.map((subject) => ({
    subject,
    students: students.map((stu) => ({
      regNo: stu.roll,
      name: stu.name,
      mark: Math.floor(Math.random() * 15) + 35, // 35–50 default
    })),
  }));
};

// MAIN DATA
const InternalMarksData = {
  "2025-2026": {
    5: {
      CSE: {
        A: createSubjectsWithMarks(
          studentsData["2025-2026-CSE-5-A"],
          subjectsByDept.CSE
        ),
        B: createSubjectsWithMarks(
          studentsData["2025-2026-CSE-5-B"],
          subjectsByDept.CSE
        ),
        C: createSubjectsWithMarks(
          studentsData["2025-2026-CSE-5-C"],
          subjectsByDept.CSE
        ),
      },

      IT: {
        A: createSubjectsWithMarks(
          studentsData["2025-2026-IT-5-A"],
          subjectsByDept.IT
        ),
        B: createSubjectsWithMarks(
          studentsData["2025-2026-IT-5-B"],
          subjectsByDept.IT
        ),
      },

      EEE: {
        A: createSubjectsWithMarks(
          studentsData["2025-2026-EEE-5-A"],
          subjectsByDept.EEE
        ),
        B: createSubjectsWithMarks(
          studentsData["2025-2026-EEE-5-B"],
          subjectsByDept.EEE
        ),
      },

      Mech: {
        A: createSubjectsWithMarks(
          studentsData["2025-2026-Mech-5-A"],
          subjectsByDept.Mech
        ),
      },
    },
  },
};

export default InternalMarksData;
