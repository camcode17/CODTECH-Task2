// Get tasks from local storage, or set an empty array if there are none
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to add a new task
function addTask() {
    const newTask = document.getElementById('new-task').value;

    if (newTask) {
        tasks.push({ text: newTask, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        document.getElementById('new-task').value = '';
        renderTasks();
    }
}

// Function to toggle the task completion
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Function to render tasks
function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear existing tasks
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" onclick="toggleComplete(${index})" ${task.completed ? 'checked' : ''}>
            <span class="${task.completed ? 'completed' : ''}" id="task-${index}">${task.text}</span>
            <button onclick="deleteTask(${index})">Delete</button>
            <button onclick="editTask(${index})">Edit</button>
        `;
        taskList.appendChild(li);
    });
}

// Function to edit a task in place
function editTask(index) {
    const taskItem = document.getElementById(`task-${index}`);
    const originalText = taskItem.textContent;

    // Create input field for editing
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = originalText;

    taskItem.parentNode.replaceChild(inputField, taskItem);
    
    // Create and append a Save button
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.onclick = () => {
        const newText = inputField.value;

        if (newText) {
            tasks[index].text = newText; // Update task text
            localStorage.setItem('tasks', JSON.stringify(tasks)); // Save to local storage
            renderTasks(); // Re-render tasks list
        }
    };
    
    inputField.parentNode.appendChild(saveButton);
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveButton.click(); // Trigger the save button when Enter is pressed
        }
    });
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1); // Remove task from array
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Update local storage
    renderTasks(); // Re-render tasks
}

// Initialize the app by displaying tasks
window.onload = renderTasks;
