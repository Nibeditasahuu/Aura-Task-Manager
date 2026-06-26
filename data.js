/* ==========================================
   DATA.JS
   Default Task Data
========================================== */

let tasks = JSON.parse(localStorage.getItem("tasks")) || [

{
    id:1,
    title:"Design Homepage",
    description:"Create a clean and modern homepage for the project.",

    priority:"High",

    status:"In Progress",

    dueDate:"2026-07-05"
},

{
    id:2,
    title:"Responsive Layout",
    description:"Optimize the website for mobile, tablet and desktop devices.",

    priority:"Medium",

    status:"Pending",

    dueDate:"2026-07-08"
},

{
    id:3,
    title:"JavaScript Features",
    description:"Implement task creation, editing and deletion functionality.",

    priority:"High",

    status:"Completed",

    dueDate:"2026-07-02"
},

{
    id:4,
    title:"Testing",
    description:"Test all project features and fix UI bugs before submission.",

    priority:"Low",

    status:"Pending",

    dueDate:"2026-07-10"
}

];

/* ==========================================
   Save Initial Data
========================================== */

localStorage.setItem("tasks", JSON.stringify(tasks));