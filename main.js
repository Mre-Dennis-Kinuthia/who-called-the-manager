// Get the form and task list elements
const form = document.querySelector('form');
const taskList = document.querySelector('#task-list');

// Initialize tasks array from local storage, or create an empty array if no tasks exist
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render tasks to the task list
function renderTasks() {
  // Clear the current task list
  taskList.innerHTML = '';

  // Loop through the tasks array and create table rows for each task
  tasks.forEach((task, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${task.name}</td>
      <td>${task.description}</td>
      <td>${task.dueDate}</td>
      <td>${task.priority}</td>
      <td>${task.status}</td>
      <td class="actions">
        <button class="delete-btn" data-index="${index}">Delete</button>
        <button class="complete-btn" data-index="${index}">Complete</button>
      </td>
    `;
    taskList.appendChild(tr);
  });

  // Save tasks array to local storage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to add a new task to the tasks array
function addTask(event) {
  event.preventDefault();

  // Get the form values
  const name = form.querySelector('#name').value;
  const description = form.querySelector('#description').value;
  const dueDate = form.querySelector('#due-date').value;
  const priority = form.querySelector('#priority').value;

  // Create a new task object and push it to the tasks array
  const task = {
    name,
    description,
    dueDate,
    priority,
    status: 'Incomplete'
  };
  tasks.push(task);

  // Render the updated task list
  renderTasks();

  // Reset the form
  form.reset();
}

// Function to delete a task from the tasks array
function deleteTask(event) {
  if (event.target.classList.contains('delete-btn')) {
    const index = event.target.dataset.index;
    tasks.splice(index, 1);
    renderTasks();
  }
}

// Function to complete a task
function completeTask(event) {
  if (event.target.classList.contains('complete-btn')) {
    const index = event.target.dataset.index;
    tasks[index].status = 'Complete';
    renderTasks();
  }
}

// Add event listeners to the form and task list
form.addEventListener('submit', addTask);
taskList.addEventListener('click', deleteTask);
taskList.addEventListener('click', completeTask);

// Render the initial task list
renderTasks();
