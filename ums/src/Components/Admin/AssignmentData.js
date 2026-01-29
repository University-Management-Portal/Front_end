import studentsData from "../Staff/StudentList.js";

const assignmentsByDept = {
  CSE: ["Assignment 1", "Assignment 2", "Assignment 3"],
  IT: ["Assignment 1", "Assignment 2"],
  EEE: ["Assignment 1", "Assignment 2"],
  Mech: ["Assignment 1"],
};

const createAssignmentsWithMarks = (students, assignments) => {
  return assignments.map((assignment) => ({
    assignment,
    students: students.map((stu) => ({
      regNo: stu.roll,
      name: stu.name,
      mark: Math.floor(Math.random() * 10) + 10, // 10–20
    })),
  }));
};

const AssignmentData = {
  "2025-2026": {
    5: {
      CSE: {
        A: createAssignmentsWithMarks(
          studentsData["CSE-5-A"],
          assignmentsByDept.CSE
        ),
        B: createAssignmentsWithMarks(
          studentsData["CSE-5-B"],
          assignmentsByDept.CSE
        ),
        C: createAssignmentsWithMarks(
          studentsData["CSE-5-C"],
          assignmentsByDept.CSE
        ),
      },

      IT: {
        A: createAssignmentsWithMarks(
          studentsData["IT-5-A"],
          assignmentsByDept.IT
        ),
        B: createAssignmentsWithMarks(
          studentsData["IT-5-B"],
          assignmentsByDept.IT
        ),
      },

      EEE: {
        A: createAssignmentsWithMarks(
          studentsData["EEE-5-A"],
          assignmentsByDept.EEE
        ),
        B: createAssignmentsWithMarks(
          studentsData["EEE-5-B"],
          assignmentsByDept.EEE
        ),
      },

      Mech: {
        A: createAssignmentsWithMarks(
          studentsData["Mech-5-A"],
          assignmentsByDept.Mech
        ),
      },
    },
  },
};

export default AssignmentData;
