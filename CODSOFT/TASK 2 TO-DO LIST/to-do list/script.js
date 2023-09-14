// Define an array to store tasks
let tasks = [];

// Load tasks from localStorage on page load
window.onload = function () {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    renderTasks();
  }
}; 

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();
  
  if (taskText !== '') {
    const task = {
      id: Date.now(),
      text: taskText,
      priority: 'medium', // Default priority
      dueDate: '', // Default due date
      completed: false
    };

    tasks.push(task);
    saveTasksToLocalStorage();
    renderTasks();

    taskInput.value = '';
  }
} 

function removeTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasksToLocalStorage();
  renderTasks();
}

function toggleCompletion(id) {
  const task = tasks.find(task => task.id === id);
  task.completed = !task.completed;
  saveTasksToLocalStorage();
  renderTasks();
}

function editTask(id, newText) {
  const task = tasks.find(task => task.id === id);
  task.text = newText;
  saveTasksToLocalStorage();
  renderTasks();
}

function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleCompletion(${task.id})">
      <input type="text" value="${task.text}" onchange="editTask(${task.id}, this.value)">
      <span class="task-priority">${task.priority}</span>
      <span class="task-due-date">${task.dueDate}</span>
      <span class="task-delete" onclick="removeTask(${task.id})">Delete</span>
    `;
    taskList.appendChild(li);
  });
}
