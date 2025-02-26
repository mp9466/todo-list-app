const API_URL = "http://127.0.0.1:8000/api/tasks"

function getAuthHeader(){

    const user = localStorage.getItem("username");
    const pass = localStorage.getItem("password");

    if (!user || !pass) {
        console.error("Error: Missing username or password");
        return null; // Prevents sending invalid headers
    }

    return "Basic " + btoa(user + ":" + pass)
}


async function fetchTasks() {

    // const response = await fetch(API_URL, {
    //     headers: {"Authorization": getAuthHeader()}
    // });
    // return response.json();

    const authHeader = getAuthHeader();
    if (!authHeader) {
        console.warn("Skipping API call: No credentials found.");
        return []; // Return an empty array instead of making an invalid request
    }

    const response = await fetch(API_URL, {
        headers: {
            "Authorization": authHeader
        }
    });

    if (response.status === 401) {
        console.error("Unauthorized: Invalid credentials.");
        return [];
    }

    const data = await response.json();
    console.log("API Response:", data);
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
