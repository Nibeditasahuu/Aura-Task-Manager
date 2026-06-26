/* ==========================================
   APP.JS
   Part 1
========================================== */

let editTaskId = null;
let deleteTaskId = null;

/* ---------- Elements ---------- */

const taskContainer = document.getElementById("taskContainer");

const taskModal = document.getElementById("taskModal");

const addTaskBtn = document.getElementById("addTaskBtn");

const closeModal = document.getElementById("closeModal");

const taskForm = document.getElementById("taskForm");

const modalTitle = document.getElementById("modalTitle");

const searchInput = document.getElementById("searchInput");

const statusFilter = document.getElementById("statusFilter");

const deleteModal = document.getElementById("deleteModal");

const confirmDelete = document.getElementById("confirmDelete");

const cancelDelete = document.getElementById("cancelDelete");


/* ==========================================
   RENDER TASKS
========================================== */

function renderTasks(taskList = tasks){

    taskContainer.innerHTML = "";

    if(taskList.length === 0){

        taskContainer.innerHTML = `

        <div class="empty-state">

            <i class="fa-solid fa-folder-open"></i>

            <h2>No Tasks Found</h2>

            <p>Create your first task to get started.</p>

        </div>

        `;

        return;

    }

    taskList.forEach(task=>{

        taskContainer.innerHTML += `

        <div class="task-card">

            <div class="task-header">

                <div>

                    <h3 class="task-title">

                        ${task.title}

                    </h3>

                    <p class="task-description">

                        ${task.description}

                    </p>

                </div>

            </div>

            <div class="task-info">

                <span class="badge ${priorityClass(task.priority)}">

                    ${task.priority}

                </span>

                <span class="badge ${statusClass(task.status)}">

                    ${task.status}

                </span>

            </div>

            <p class="task-date">

                <i class="fa-solid fa-calendar-days"></i>

                Due : ${formatDate(task.dueDate)}

            </p>

            <div class="task-actions">

                <button

                class="action-btn edit-btn"

                onclick="editTask(${task.id})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button

                class="action-btn delete-btn"

                onclick="deleteTask(${task.id})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        </div>

        `;

    });

}


/* ==========================================
   OPEN ADD MODAL
========================================== */

addTaskBtn.onclick = ()=>{

    editTaskId = null;

    modalTitle.textContent = "Add Task";

    taskForm.reset();

    taskModal.classList.add("active");

};


/* ==========================================
   CLOSE MODAL
========================================== */

closeModal.onclick = ()=>{

    taskModal.classList.remove("active");

};


/* ==========================================
   CLOSE ON OUTSIDE CLICK
========================================== */

window.onclick = (e)=>{

    if(e.target === taskModal){

        taskModal.classList.remove("active");

    }

    if(e.target === deleteModal){

        deleteModal.classList.remove("active");

    }

};


/* ==========================================
   INITIAL LOAD
========================================== */

renderTasks();

updateDashboard();
/* ==========================================
   ADD / UPDATE TASK
========================================== */

taskForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const title = document.getElementById("taskTitle").value.trim();

    const description = document.getElementById("taskDescription").value.trim();

    const priority = document.getElementById("taskPriority").value;

    const status = document.getElementById("taskStatus").value;

    const dueDate = document.getElementById("taskDate").value;

    if (
        title === "" ||
        description === "" ||
        dueDate === ""
    ) {

        alert("Please fill all fields.");

        return;

    }

    if (editTaskId === null) {

        const task = {

            id: generateId(),

            title,

            description,

            priority,

            status,

            dueDate

        };

        tasks.unshift(task);

        showSuccess("Task Added Successfully");

    } else {

        const index = tasks.findIndex(task => task.id === editTaskId);

        if (index !== -1) {

            tasks[index] = {

                id: editTaskId,

                title,

                description,

                priority,

                status,

                dueDate

            };

        }

        showSuccess("Task Updated Successfully");

    }

    saveTasks();

    updateDashboard();

    renderTasks();

    taskModal.classList.remove("active");

    taskForm.reset();

    editTaskId = null;

});


/* ==========================================
   EDIT TASK
========================================== */

function editTask(id) {

    const task = tasks.find(item => item.id === id);

    if (!task) return;

    editTaskId = id;

    modalTitle.textContent = "Edit Task";

    document.getElementById("taskTitle").value = task.title;

    document.getElementById("taskDescription").value = task.description;

    document.getElementById("taskPriority").value = task.priority;

    document.getElementById("taskStatus").value = task.status;

    document.getElementById("taskDate").value = task.dueDate;

    taskModal.classList.add("active");

}
/* ==========================================
   DELETE TASK
========================================== */

function deleteTask(id){

    deleteTaskId = id;

    deleteModal.classList.add("active");

}

confirmDelete.onclick = ()=>{

    tasks = tasks.filter(task => task.id !== deleteTaskId);

    saveTasks();

    updateDashboard();

    renderTasks();

    deleteModal.classList.remove("active");

    showSuccess("Task Deleted Successfully");

};

cancelDelete.onclick = ()=>{

    deleteModal.classList.remove("active");

};


/* ==========================================
   SEARCH TASKS
========================================== */

searchInput.addEventListener("keyup", filterTasks);


/* ==========================================
   FILTER STATUS
========================================== */

statusFilter.addEventListener("change", filterTasks);


/* ==========================================
   SEARCH + FILTER
========================================== */

function filterTasks(){

    const keyword = searchInput.value.toLowerCase();

    const status = statusFilter.value;

    const filtered = tasks.filter(task=>{

        const matchTitle =
            task.title.toLowerCase().includes(keyword);

        const matchStatus =
            status === "all"
            ||
            task.status === status;

        return matchTitle && matchStatus;

    });

    renderTasks(filtered);

}


/* ==========================================
   SORT TASKS BY DATE
========================================== */

tasks.sort((a,b)=>{

    return new Date(a.dueDate) - new Date(b.dueDate);

});


/* ==========================================
   KEYBOARD SHORTCUT
========================================== */

document.addEventListener("keydown",(e)=>{

    if(e.key === "Escape"){

        taskModal.classList.remove("active");

        deleteModal.classList.remove("active");

    }

});


/* ==========================================
   AUTO CLOSE SUCCESS POPUP
========================================== */

const observer = new MutationObserver(()=>{

    const popup = document.getElementById("successPopup");

    if(popup.classList.contains("active")){

        setTimeout(()=>{

            popup.classList.remove("active");

        },2500);

    }

});

observer.observe(document.getElementById("successPopup"),{

    attributes:true

});


/* ==========================================
   INITIALIZE APP
========================================== */

loadTasks();

updateDashboard();

renderTasks();


/* ==========================================
   END OF APP
========================================== */