document.addEventListener("DOMContentLoaded", async () => {


    const form = document.getElementById("task-form");

    const taskList = document.getElementById("task-list");

    async function loadTasks() {
        
        // taskList.innerHTML = "";
        
        // const tasks = await fetchTasks();
        
        // tasks.forEach(task => {
            
        //     const li = document.createElement("li");
            
        //     li.className = "task";
        //     li.innerHTML = `<span>${task.title} - ${task.description}</span>
        //         <button onclick="removeTask(${task.id})">Delete</button>
        //         <input type="checkbox" ${task.completed ? "checked" : ""} 
        //         onclick="toggleTaskCompletion(${task.id})">`;
            
        //     taskList.appendChild(li);

            taskList.innerHTML = "";
    const tasks = await fetchTasks();

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        // ✅ Attach event listener directly to the checkbox
        checkbox.addEventListener("change", () => toggleTaskCompletion(task.id));

        li.innerHTML = `
            <span class="${task.completed ? "completed" : ""}">${task.title} - ${task.description}</span>
            <button onclick="removeTask(${task.id})">Delete</button>
        `;

        li.prepend(checkbox);
        taskList.appendChild(li)
        });
    }

    window.toggleTaskCompletion = async (id) => {
        
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

    //loadTasks();


    window.login = function(){

        const user = document.getElementById("username").value;
        const pass = document.getElementById("password").value;

        if(!user || !pass){

            alert("Please enter right credentials");
            return;
        }

        localStorage.setItem("username", user);
        localStorage.setItem("password", pass);

        document.getElementById("login-form").style.display = "none";
        document.getElementById("task-app").style.display = "block";
        loadTasks();

    }




});