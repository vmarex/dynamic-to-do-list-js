// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when the page loads
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // Load tasks without saving again to Local Storage
    }

    // Function to add a new task to the list
    function addTask(taskText, save = true) {
        // Create a new list item (li) to hold the task
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Create a remove button to delete the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Add click event listener to the remove button to delete the task
        removeBtn.addEventListener('click', function() {
            taskList.removeChild(taskItem); // Remove the corresponding task item
            removeTask(taskText); // Remove the task from Local Storage
        });

        // Append the remove button to the task item
        taskItem.appendChild(removeBtn);

        // Append the task item to the task list (ul)
        taskList.appendChild(taskItem);

        // Save the task to Local Storage if 'save' is true (prevents duplication when loading tasks)
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Function to remove a task from Local Storage
    function removeTask(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText); // Filter out the removed task
        localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Update Local Storage
    }

    // Add event listener to the "Add Task" button
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim(); // Get task input value and remove extra spaces

        // Check if task input is empty
        if (taskText === '') {
            alert('Please enter a task'); // Prompt user to enter a task if input is empty
            return; // Stop function execution if input is empty
        }

        // Add the task and clear the input field
        addTask(taskText);
        taskInput.value = ''; // Clear the input field after adding the task
    });

    // Add keypress event listener to the task input to allow pressing "Enter" to add a task
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addButton.click(); // Trigger the "Add Task" button click when Enter is pressed
        }
    });

    // Load tasks from Local Storage when the page loads
    loadTasks();
});
