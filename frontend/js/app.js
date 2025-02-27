document.addEventListener("DOMContentLoaded", async () => {


    const form = document.getElementById("task-form");

    const taskList = document.getElementById("task-list");

    async function loadTasks() {
        
        taskList.innerHTML = "";
        
        const tasks = await fetchTasks();

        tasks.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        
        tasks.forEach(task => {
            
            const li = document.createElement("li");
            
            li.className = "task";

            const taskDate = new Date(task.timestamp).toLocaleString();

            li.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""} 
                onclick="toggleCompletion(${task.id})">
            <span class="task-title">${task.title}</span>
            <span class="task-desc">${task.description}</span>
            <span class="task-time">Created: ${taskDate}</span>
            <button onclick="removeTask(${task.id})">Delete</button>
            <button onclick="startEdit(${task.id})">Edit</button>`;
            
            taskList.appendChild(li);
     });
    }

    window.toggleCompletion = async (id) => {
        
        await toggleTaskCompletion(id);
        loadTasks();

    };

    form.addEventListener("submit", async (e) => {
        
        e.preventDefault();
        
        const title = document.getElementById("task-title").value;
        const description = document.getElementById("task-desc").value;

        await addTask(title, description);
        loadTasks();
        form.reset();

    });

    window.removeTask = async (id) => {
        await deleteTask(id);
        loadTasks();
    };



    window.login = async function(){

        const user = document.getElementById("username").value;
        const pass = document.getElementById("password").value;

        if(!user || !pass){

            alert("Please enter right credentials");
            return;
        }

        const isValid = await validateCredentials(user, pass);
    if (!isValid) {
        alert("Invalid username or password. Please try again.");
        return;  
    }

        localStorage.setItem("username", user);
        localStorage.setItem("password", pass);

        document.getElementById("login-form").style.display = "none";
        document.getElementById("task-app").style.display = "block";
        loadTasks();

    }

    window.startEdit = (id) => {

        const taskElement = document.querySelector(`button[onclick="startEdit(${id})"]`).parentElement;
        const titleSpan = taskElement.querySelector(".task-title");
        const descSpan = taskElement.querySelector(".task-desc");

        titleSpan.innerHTML = `<input type="text" value="${titleSpan.innerText}" id="edit-title-${id}">`;
        descSpan.innerHTML = `<input type="text" value="${descSpan.innerText}" id="edit-desc-${id}">`;

        taskElement.querySelector(`button[onclick="startEdit(${id})"]`).outerHTML = 
        `<button onclick="saveEdit(${id})">Save</button>`;
    
    };

    window.saveEdit = async (id) => {

        const newTitle = document.getElementById(`edit-title-${id}`).value;
        const newDesc = document.getElementById(`edit-desc-${id}`).value;

        await editTask(id, newTitle, newDesc);
        loadTasks();  
};


});