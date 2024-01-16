//the line waits for the html file to load first
document.addEventListener("DOMContentLoaded", function () {
  //assignment of id from html to  a var
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const todoList = document.getElementById('todo-list');

    // Load tasks from local storage when the page is loaded
    loadTasks();
    //function is executed when the form is submited.
    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Check if the input field is not empty before adding a new task
        if (taskInput.value.trim() !== '') {
            addTask(taskInput.value);
            taskInput.value = '';

            // Save tasks to local storage after adding a new task
            saveTasks();
        }
    });

    function addTask(task) {
        const newTask = createTaskElement(task);

        newTask.appendChild(createDoneButton(newTask));
        newTask.appendChild(createDeleteButton(newTask));

        todoList.appendChild(newTask);
    }

    function createTaskElement(taskText) {
        const newTask = document.createElement('div');
        newTask.classList.add('task');

        const taskTextNode = document.createElement('span');
        taskTextNode.classList.add('task-text');
        taskTextNode.innerText = taskText;

        newTask.appendChild(taskTextNode);

        return newTask;
    }

    function createDoneButton(taskElement) {
        const doneBtn = document.createElement('button');
        doneBtn.classList.add('done-btn');
        doneBtn.innerText = 'Done';

        doneBtn.addEventListener('click', function () {
            const taskText = taskElement.querySelector('.task-text');
            taskText.style.textDecoration = 'line-through';

            // Save tasks to local storage after marking a task as done
            saveTasks();
        });

        return doneBtn;
    }

    function createDeleteButton(taskElement) {
        const deleteBtn = document.createElement('span');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerText = '❌';

        deleteBtn.addEventListener('click', function () {
            taskElement.remove();

            // Save tasks to local storage after deleting a task
            saveTasks();
        });

        return deleteBtn;
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

        savedTasks.forEach(task => {
            const newTask = createTaskElement(task);
            newTask.appendChild(createDoneButton(newTask));
            newTask.appendChild(createDeleteButton(newTask));

            // Add the new task without applying the line-through style
            todoList.appendChild(newTask);
        });
    }

    function saveTasks() {
        const tasks = document.querySelectorAll('.task-text');
        const taskArray = Array.from(tasks).map(task => task.innerText);
        localStorage.setItem('tasks', JSON.stringify(taskArray));
    }
});
