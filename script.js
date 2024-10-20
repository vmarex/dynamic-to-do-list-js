// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Select important DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task to the list
    function addTask() {
        const taskText = taskInput.value.trim(); // Get task input value and remove extra spaces

        // Check if task input is empty
        if (taskText === '') {
            alert('Please enter a task'); // Prompt user to enter a task if input is empty
            return; // Stop function execution if input is empty
        }

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
        });

        // Append the remove button to the task item
        taskItem.appendChild(removeBtn);

        // Append the task item to the task list (ul)
        taskList.appendChild(taskItem);

        // Clear the input field after adding the task
        taskInput.value = '';
    }

    // Add click event listener to the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Add keypress event listener to the task input to allow pressing "Enter" to add a task
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(); // Call addTask function when "Enter" is pressed
        }
    });
});
