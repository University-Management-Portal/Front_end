import Studentdata from '../Student/Studentdata';

  const name = Studentdata.find(item => item.label === "Name")?.value;
  const regNo = Studentdata.find(item => item.label === "Reg No")?.value;
  const branch = Studentdata.find(item => item.label === "Department")?.value;

const Resultdata = {
  name: name,
  programme: "BE",
  branch: branch,
  regNo: regNo,

  semesters: [
    {
      sem: 1,
      monthYear: "Dec 2023",
      subjects: [
        { code: "21MA101", title: "Mathematics I", credits: 4, gradePoint: 8, grade: "A : Very Good" },
        { code: "21PH101", title: "Physics", credits: 3, gradePoint: 7, grade: "B+ : Good" },
      ]
    },
    {
      sem: 2,
      monthYear: "May 2024",
      subjects: [
        { code: "21MA201", title: "Mathematics II", credits: 4, gradePoint: 9, grade: "A+ : Excellent" },
        { code: "21CS201", title: "Data Structures", credits: 3, gradePoint: 8, grade: "A : Very Good" },
      ]
    },
    {
      sem: 3,
      monthYear: "Dec 2024",
      subjects: [
        { code: "23CS301", title: "DBMS", credits: 3, gradePoint: 8, grade: "A : Very Good" },
      ]
    },
    {
      sem: 4,
      monthYear: "May 2025",
      subjects: [
        { code: "23CS401", title: "Operating Systems", credits: 3, gradePoint: 8, grade: "A : Very Good" },
      ]
    },
    {
      sem: 5,
      monthYear: "Dec 2025",
      subjects: [
        { code: "23CSP501", title: "Mern Stack Development", credits: 3, gradePoint: 7, grade: "B+ : Good" },
        { code: "23ADR405", title: "Machine Learning Techniques", credits: 4, gradePoint: 0, grade: "U : Failed in Course" },
      ]
    },
    {
      sem: 6,
      monthYear: "May 2026",
      subjects: [
        { code: "23CS601", title: "Cloud Computing", credits: 4, gradePoint: 8, grade: "A : Very Good" },
      ]
    }
  ]
};

export default Resultdata;