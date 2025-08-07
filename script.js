const darkToggle = document.getElementById('darkToggle');
const categoryButtons = document.querySelectorAll('.cat');
const taskInput = document.getElementById('taskInput');
const dueDate = document.getElementById('dueDate');
const notes = document.getElementById('notes');
const addTask = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

let selectedCategory = '';

categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    categoryButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedCategory = btn.dataset.value;
  });
});

addTask.addEventListener('click', () => {
  const text = taskInput.value.trim();
  const dateValue = dueDate.value;
  const noteText = notes.value.trim();

  if (!text) return alert('Please enter a task');

  const taskItem = document.createElement('li');
  const timeRemaining = dateValue ? getTimeRemaining(dateValue) : 'No due time';

  taskItem.innerHTML = `
    <strong>${text}</strong><br>
    📁 ${selectedCategory || 'No category'}<br>
    🗓 ${dateValue || 'No date'}<br>
    📝 ${noteText || 'No notes'}<br>
    <span class="time-remaining">⏳ ${timeRemaining}</span>
    <div class="task-controls">
      <button onclick="markDone(this)">✅ Done</button>
      <button onclick="deleteTask(this)">🗑 Delete</button>
    </div>
  `;

  taskList.classList.remove('empty');
  taskList.appendChild(taskItem);

  // Reset form
  taskInput.value = '';
  dueDate.value = '';
  notes.value = '';
  selectedCategory = '';
  categoryButtons.forEach(b => b.classList.remove('active'));
});

function deleteTask(btn) {
  const li = btn.closest('li');
  li.remove();
  if (!taskList.querySelector('li')) {
    taskList.classList.add('empty');
  }
}

function markDone(btn) {
  const li = btn.closest('li');
  li.style.textDecoration = 'line-through';
  li.style.opacity = 0.6;
}

function getTimeRemaining(datetime) {
  const now = new Date();
  const then = new Date(datetime);
  const diff = then - now;
  if (diff <= 0) return 'Overdue';
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${mins}m left`;
}

// Dark mode toggle
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});
