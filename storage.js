/* ==========================================
   STORAGE.JS
   LocalStorage Utility Functions
========================================== */

/* ---------- Save Tasks ---------- */

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

/* ---------- Load Tasks ---------- */

function loadTasks() {

    const storedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (storedTasks) {

        tasks = storedTasks;

    }

}

/* ---------- Generate Unique ID ---------- */

function generateId() {

    return Date.now();

}

/* ---------- Dashboard Statistics ---------- */

function updateDashboard() {

    document.getElementById("totalTasks").textContent = tasks.length;

    document.getElementById("pendingTasks").textContent =
        tasks.filter(task => task.status === "Pending").length;

    document.getElementById("progressTasks").textContent =
        tasks.filter(task => task.status === "In Progress").length;

    document.getElementById("completedTasks").textContent =
        tasks.filter(task => task.status === "Completed").length;

}

/* ---------- Success Notification ---------- */

function showSuccess(message = "Task Saved Successfully") {

    const popup = document.getElementById("successPopup");

    popup.querySelector("h2").textContent = message;

    popup.classList.add("active");

    setTimeout(() => {

        popup.classList.remove("active");

    }, 2500);

}

/* ---------- Format Date ---------- */

function formatDate(date) {

    return new Date(date).toLocaleDateString("en-IN", {

        day: "2-digit",

        month: "short",

        year: "numeric"

    });

}

/* ---------- Priority Badge ---------- */

function priorityClass(priority) {

    switch (priority) {

        case "High":
            return "priority-high";

        case "Medium":
            return "priority-medium";

        case "Low":
            return "priority-low";

        default:
            return "";
    }

}

/* ---------- Status Badge ---------- */

function statusClass(status) {

    switch (status) {

        case "Pending":
            return "status-pending";

        case "In Progress":
            return "status-progress";

        case "Completed":
            return "status-completed";

        default:
            return "";
    }

}

/* ---------- Initial Load ---------- */

loadTasks();

updateDashboard();