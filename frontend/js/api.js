const API_URL = "http://127.0.0.1:8000/api/tasks"

function getAuthHeader(){

    const user = localStorage.getItem("username");
    const pass = localStorage.getItem("password");

    if (!user || !pass) {
        console.error("Error: Missing username or password");
        return null; 
    }

    return "Basic " + btoa(user + ":" + pass)
}


async function fetchTasks() {

    const response = await fetch(API_URL, {
        headers: {
            "Authorization": getAuthHeader()
        }
    });

    if (response.status === 401) {
        console.error("Unauthorized: Invalid credentials.");
        return [];
    }

    const data = await response.json();
    return data;

}

async function addTask(title, description) {
    
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": getAuthHeader()
        },
        body: JSON.stringify({title, description, completed: false})
    });

    return response.json()
}

async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { "Authorization": getAuthHeader() }
    });
}

async function toggleTaskCompletion(id) {
    const response = await fetch(`${API_URL}/${id}/complete`, {
        method: "PUT",
        headers: { "Authorization": getAuthHeader() }
    });
    return response.json()
}


async function editTask(id, title, description) {
    const response = await fetch(`${API_URL}/${id}/edit`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": getAuthHeader()
        },
        body: JSON.stringify({title, description, completed: false})
    });

    return response.json();
}


async function validateCredentials(username, password) {

    const authHeader = "Basic " + btoa(username + ":" + password);

    const response = await fetch(API_URL, {
        method: "GET",
        headers: { "Authorization": authHeader }
    });

    return response.ok; 
    
}
