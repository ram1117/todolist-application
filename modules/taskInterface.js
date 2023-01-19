import Storage from './storage.js';
import Task from './task.js';

export default class TaskInterface {
  constructor() {
    this.taskArray = null;
    this.listElement = document.querySelector('.todo-list');
    this.todoInputElement = document.querySelector('#todolist-input');
    this.listItemEdit = null;
    this.listItemEditField = null;
    this.listItemDelButton = null;
    this.selectedCheckBox = null;
    this.newListItem = null;
    this.task = null;
    this.todoInputElement.onkeyup = (event) => {
      if (event.key === 'Enter' && this.todoInputElement.value !== '') {
        this.addTask();
      }
    };

    this.enterButton = document.querySelector('#enter-button');
    this.enterButton.onclick = () => {
      if (this.todoInputElement.value !== '') {
        this.addTask();
      }
    };

    // add event listener to list and check targets

    this.listElement.onclick = (event) => {
      if (event.target.type === 'checkbox') {
        this.updateTaskStatus(event.target);
      }
    };

    // long press event listener to access edit task functionality
    this.listElement.addEventListener('long-press', (event) => {
      event.preventDefault();
      if (event.target.classList.contains('button-more')) { this.updateTaskDetails(event.target); }
    });
  }

  // update task details after edit in localstorage
  updateTaskDetails(target) {
    this.listItemEdit = target.parentNode;
    this.listItemEditField = this.listItemEdit.querySelector('.task-details');
    this.createEditWindow();
    const arr = Storage.getTaskArray();
    const index = parseInt(this.listItemEdit.id, 10) - 1;
    this.task = arr[index];
    this.listItemEditField.onkeyup = (event) => {
      if (event.key === 'Enter') {
        this.task.details = this.listItemEditField.value;
        Storage.setTaskArray(arr);
        this.resetEditWindow();
      }
    };
    this.listItemDelButton.onclick = () => {
      this.removeTask(index);
    };
    document.body.onkeyup = (event) => {
      if (event.key === 'Escape') {
        this.resetEditWindow();
      }
    };

    document.body.onclick = (event) => {
      if (event.target.parentNode.id !== this.listItemEdit.id) {
        this.resetEditWindow();
      }
    };
  }

  createEditWindow() {
    this.listItemEditField.removeAttribute('readonly');
    this.listItemEditField.focus();
    this.listItemEditField.style.background = '#e6ffe6';
    this.listItemEdit.style.background = '#e6ffe6';
    this.listItemEdit.lastElementChild.style.display = 'none';

    this.listItemDelButton = this.listItemEdit.querySelector('.button-delete');
    this.listItemDelButton.style.display = 'inline';
  }

  // remove task from localstorage
  removeTask(index) {
    const arr = Storage.getTaskArray();
    arr.splice(index, 1);
    Storage.setTaskArray(arr);
    this.updateTaskId();
    this.loadTasks();
  }

  // update taskid of all tasks in localstorage after a task removed
  updateTaskId() {
    const arr = Storage.getTaskArray();
    this.taskArray = arr;
    for (let i = 0; i < arr.length; i += 1) {
      arr[i].id = i + 1;
    }
    Storage.setTaskArray(arr);
  }

  resetEditWindow() {
    this.listItemEditField.setAttribute('readonly', true);
    this.listItemEditField.style.background = '#fff';
    this.listItemEdit.style.background = '#fff';
    this.listItemEdit.lastElementChild.style.display = 'inline';
    this.listItemDelButton.style.display = 'none';
  }

  // update task status when checkbox is clicked
  updateTaskStatus(target) {
    this.selectedCheckBox = target;
    this.selectedCheckBox.nextSibling.classList.toggle('strike-through');
    const arr = Storage.getTaskArray();
    const index = parseInt(this.selectedCheckBox.parentNode.id, 10) - 1;
    arr[index].completed = this.selectedCheckBox.checked;
    Storage.setTaskArray(arr);
  }

  // add new task upon enter key
  addTask() {
    const arr = Storage.getTaskArray();
    const task = new Task(arr.length + 1, this.todoInputElement.value, false);
    arr.push(task);
    Storage.setTaskArray(arr);
    this.listElement.insertBefore(this.createTaskTile(task), this.listElement.lastElementChild);
    this.todoInputElement.value = '';
  }

  // loads tasklist from localstorage to the webpage
  loadTasks() {
    const tasks = document.querySelectorAll('.todo-list-task');
    for (let i = 0; i < tasks.length; i += 1) {
      this.listElement.removeChild(tasks[i]);
    }
    Storage.getTaskArray().forEach((task) => {
      this.listElement.insertBefore(this.createTaskTile(task), this.listElement.lastElementChild);
    });
  }

  // create individual task tile using task object
  createTaskTile(task) {
    const listItem = document.createElement('li');
    this.newListItem = listItem;
    listItem.classList.add('todo-list-item', 'todo-list-task');
    listItem.id = task.id;
    listItem.draggable = 'true';

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';

    const taskDetail = document.createElement('input');
    taskDetail.type = 'text';
    taskDetail.classList.add('task-details');
    taskDetail.value = task.details;
    taskDetail.setAttribute('readonly', true);

    if (task.completed) {
      checkBox.checked = task.completed;
      taskDetail.classList.toggle('strike-through');
    }
    const buttonDelete = document.createElement('span');
    buttonDelete.classList.add('material-icons', 'button-delete');
    buttonDelete.textContent = 'delete';
    buttonDelete.style.display = 'none';

    const iconSpan = document.createElement('span');
    iconSpan.classList.add('material-icons', 'button-more');
    iconSpan.textContent = 'more_vert';

    listItem.appendChild(checkBox);
    listItem.appendChild(taskDetail);
    listItem.appendChild(buttonDelete);
    listItem.appendChild(iconSpan);
    return listItem;
  }
}