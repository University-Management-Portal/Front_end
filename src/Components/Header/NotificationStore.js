// notificationStore.js

export const notificationStore = {
  student: [
    {
      id: 1,
      message: "New assignment posted in MERN Stack",
      time: "5 mins ago",
      read: false,
      link: "/student-courses/mern-stack/assignments"
    },
    {
      id: 2,
      message: "Material uploaded for Data Structure",
      time: "1 hour ago",
      read: false,
      link: "/student-courses/data-structure/materials"
    }
  ],

  staff: [
    {
      id: 1,
      message: "Student submitted Assignment 1",
      time: "10 mins ago",
      read: false,
      link: "/staff-course/mern-stack"
    }
  ],

  admin: [
    {
      id: 1,
      message: "New student registered",
      time: "Today",
      read: false
    }
  ]
};
