document.addEventListener('DOMContentLoaded', loadTasks); // Load tasks when the document is loaded

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (taskText !== '') {
        const taskList = document.getElementById('taskList');

        // Create a new task item
        const li = document.createElement('li');
        li.innerHTML = `
            ${taskText}
            <button onclick="deleteTask(this)">Delete</button>
        `;

        // Add double-click event to enable editing
        li.addEventListener('dblclick', function() {
            editTask(li);
        });

        // Add click event to toggle task completion
        li.addEventListener('click', function() {
            li.classList.toggle('completed');
            saveTasks(); // Save tasks after toggling completion
        });

        taskList.appendChild(li);
        saveTasks(); // Save tasks after adding a new task
        taskInput.value = ''; // Clear input field
    }
}

function deleteTask(button) {
    const li = button.parentElement;
    li.remove();
    saveTasks(); // Save tasks after deleting
}

function editTask(taskItem) {
    const currentText = taskItem.firstChild.textContent.trim();
    const newText = prompt("Edit your task:", currentText);

    if (newText !== null && newText.trim() !== '') {
        taskItem.firstChild.textContent = newText;
        saveTasks(); // Save tasks after editing
    }
}

function filterTasks(filter) {
    const tasks = document.querySelectorAll('#taskList li'); // Select all task list items
    tasks.forEach(task => {
        switch (filter) {
            case 'all':
                task.style.display = 'flex'; // Show all tasks
                break;
            case 'completed':
                if (task.classList.contains('completed')) {
                    task.style.display = 'flex'; // Show only completed tasks
                } else {
                    task.style.display = 'none'; // Hide non-completed tasks
                }
                break;
            case 'pending':
                if (!task.classList.contains('completed')) {
                    task.style.display = 'flex'; // Show only pending tasks
                } else {
                    task.style.display = 'none'; // Hide completed tasks
                }
                break;
        }
    });
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(task => {
        tasks.push({
            text: task.firstChild.textContent.trim(),
            completed: task.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${task.text}
            <button onclick="deleteTask(this)">Delete</button>
        `;
        
        if (task.completed) {
            li.classList.add('completed');
        }

        // Add double-click event to enable editing
        li.addEventListener('dblclick', function() {
            editTask(li);
        });

        // Add click event to toggle task completion
        li.addEventListener('click', function() {
            li.classList.toggle('completed');
            saveTasks();
        });

        taskList.appendChild(li);
    });
}
