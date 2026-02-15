/**
 * Task Manager Application
 * A simple and elegant task management app with ES6+ JavaScript
 */

class TaskManager {
  constructor() {
    this.tasks = [];
    this.currentFilter = 'all';
    this.init();
  }

  // Initialize the app
  init() {
    this.loadTasks();
    this.cacheElements();
    this.bindEvents();
    this.render();
  }

  // Cache DOM elements
  cacheElements() {
    this.form = document.querySelector('.task-input__form');
    this.input = document.getElementById('task-input');
    this.taskList = document.getElementById('task-list');
    this.emptyState = document.getElementById('empty-state');
    this.taskCount = document.getElementById('task-count');
    this.taskPlural = document.getElementById('task-plural');
    this.totalCount = document.getElementById('total-count');
    this.completedCount = document.getElementById('completed-count');
    this.remainingCount = document.getElementById('remaining-count');
    this.filterButtons = document.querySelectorAll('.tasks__filter');
  }

  // Bind event listeners
  bindEvents() {
    this.form.addEventListener('submit', (e) => this.handleAddTask(e));
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.form.dispatchEvent(new Event('submit'));
      }
    });

    this.filterButtons.forEach((button) => {
      button.addEventListener('click', (e) => this.handleFilter(e));
    });

    // Event delegation for task actions
    this.taskList.addEventListener('click', (e) => {
      if (e.target.classList.contains('tasks__delete')) {
        this.handleDeleteTask(e);
      } else if (e.target.classList.contains('tasks__checkbox')) {
        this.handleCompleteTask(e);
      }
    });
  }

  // Handle adding a new task
  handleAddTask(e) {
    e.preventDefault();
    const taskText = this.input.value.trim();

    if (!taskText) {
      this.input.focus();
      return;
    }

    const task = {
      id: Date.now(),
      text: taskText,
      completed: false,
      createdAt: new Date().toLocaleString(),
    };

    this.tasks.push(task);
    this.saveTasks();
    this.input.value = '';
    this.input.focus();
    this.render();

    // Announce to screen readers
    this.announceToScreenReader(`Task "${taskText}" added`);
  }

  // Handle deleting a task
  handleDeleteTask(e) {
    const taskItem = e.target.closest('.tasks__item');
    const taskId = parseInt(taskItem.dataset.taskId, 10);

    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.saveTasks();
    this.render();

    this.announceToScreenReader('Task deleted');
  }

  // Handle marking task as completed
  handleCompleteTask(e) {
    const taskId = parseInt(e.target.dataset.taskId, 10);
    const task = this.tasks.find((t) => t.id === taskId);

    if (task) {
      task.completed = !task.completed;
      this.saveTasks();
      this.render();

      const status = task.completed ? 'marked as completed' : 'marked as active';
      this.announceToScreenReader(`Task ${status}`);
    }
  }

  // Handle filter changes
  handleFilter(e) {
    this.currentFilter = e.target.dataset.filter;

    this.filterButtons.forEach((btn) => {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    });

    e.target.classList.add('active');
    e.target.setAttribute('aria-pressed', 'true');

    this.render();
  }

  // Filter tasks based on current filter
  getFilteredTasks() {
    switch (this.currentFilter) {
      case 'active':
        return this.tasks.filter((task) => !task.completed);
      case 'completed':
        return this.tasks.filter((task) => task.completed);
      default:
        return this.tasks;
    }
  }

  // Render the task list
  render() {
    this.renderTasks();
    this.updateStats();
  }

  // Render individual tasks
  renderTasks() {
    const filteredTasks = this.getFilteredTasks();
    this.taskList.innerHTML = '';

    if (filteredTasks.length === 0) {
      this.emptyState.style.display = 'block';
      return;
    }

    this.emptyState.style.display = 'none';

    filteredTasks.forEach((task) => {
      const taskItem = this.createTaskElement(task);
      this.taskList.appendChild(taskItem);
    });
  }

  // Create a task element
  createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `tasks__item ${task.completed ? 'tasks__item--completed' : ''}`;
    li.dataset.taskId = task.id;
    li.role = 'listitem';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'tasks__checkbox';
    checkbox.checked = task.completed;
    checkbox.dataset.taskId = task.id;
    checkbox.setAttribute('aria-label', `Mark "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`);

    const textSpan = document.createElement('span');
    textSpan.className = 'tasks__text';
    textSpan.textContent = task.text;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'tasks__delete';
    deleteButton.textContent = 'Delete';
    deleteButton.setAttribute('aria-label', `Delete task "${task.text}"`);

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(deleteButton);

    return li;
  }

  // Update statistics
  updateStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter((task) => task.completed).length;
    const remaining = total - completed;

    this.totalCount.textContent = total;
    this.completedCount.textContent = completed;
    this.remainingCount.textContent = remaining;

    // Update task count with proper pluralization
    this.taskCount.textContent = this.tasks.length;
    this.taskPlural.textContent = this.tasks.length === 1 ? '' : 's';
  }

  // Save tasks to localStorage
  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  // Load tasks from localStorage
  loadTasks() {
    const stored = localStorage.getItem('tasks');
    this.tasks = stored ? JSON.parse(stored) : [];
  }

  // Announce messages to screen readers
  announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
      announcement.remove();
    }, 1000);
  }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TaskManager();
});