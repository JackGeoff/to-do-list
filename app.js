document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const todoList = document.getElementById('todo-list');

    loadTasks();

    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (taskInput.value.trim() !== '') {
            addTask(taskInput.value, false); // Pass 'false' for 'done' initially
            taskInput.value = '';
            saveTasks();
        }
    });

    function addTask(task, isDone) {
        const newTask = createTaskElement(task);

        if (isDone) {
            markTaskAsDone(newTask);
        }

        newTask.appendChild(createDoneButton(newTask));
        newTask.appendChild(createDeleteButton(newTask));

        todoList.appendChild(newTask);
    }

    function markTaskAsDone(taskElement) {
        const taskText = taskElement.querySelector('.task-text');
        taskText.style.textDecoration = 'line-through';
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
            markTaskAsDone(taskElement);
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
            saveTasks();
        });

        return deleteBtn;
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

        savedTasks.forEach(task => {
            const [taskText, isDone] = task.split('|');
            const newTask = createTaskElement(taskText);
            addTask(taskText, isDone === 'true');
        });
    }

    function saveTasks() {
        const tasks = document.querySelectorAll('.task-text');
        const taskArray = Array.from(tasks).map(task => {
            const isDone = task.style.textDecoration === 'line-through';
            return `${task.innerText}|${isDone}`;
        });

        localStorage.setItem('tasks', JSON.stringify(taskArray));
    }
});
