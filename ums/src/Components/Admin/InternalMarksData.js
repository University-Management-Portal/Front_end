import studentsData from "../Staff/StudentList.js";


const subjectsByDept = {
  CSE: ["DBMS", "OS", "DSA"],
  IT: ["DBMS", "OS", "CN", "AA"],
  EEE: ["Circuit Diagram", "Solid Mechanics", "Digital Logic Circuit"],
  Mech: ["Mechanism", "Thermodynamics", "Strength of Materials"],
};


const createSubjectsWithMarks = (students, subjects) => {
  return subjects.map((subject) => ({
    subject,
    students: students.map((stu) => ({
      regNo: stu.roll,
      name: stu.name,
      mark: Math.floor(Math.random() * 15) + 35, 
    })),
  }));
};

// MAIN DATA
const InternalMarksData = {
  "2025-2026": {
    5: {
      CSE: {
        A: createSubjectsWithMarks(
          studentsData["CSE-5-A"],
          subjectsByDept.CSE
        ),
        B: createSubjectsWithMarks(
          studentsData["CSE-5-B"],
          subjectsByDept.CSE
        ),
        C: createSubjectsWithMarks(
          studentsData["CSE-5-C"],
          subjectsByDept.CSE
        ),
      },

      IT: {
        A: createSubjectsWithMarks(
          studentsData["IT-5-A"],
          subjectsByDept.IT
        ),
        B: createSubjectsWithMarks(
          studentsData["IT-5-B"],
          subjectsByDept.IT
        ),
      },

      EEE: {
        A: createSubjectsWithMarks(
          studentsData["EEE-5-A"],
          subjectsByDept.EEE
        ),
        B: createSubjectsWithMarks(
          studentsData["EEE-5-B"],
          subjectsByDept.EEE
        ),
      },

      Mech: {
        A: createSubjectsWithMarks(
          studentsData["Mech-5-A"],
          subjectsByDept.Mech
        ),
      },
    },
  },
};

export default InternalMarksData;
