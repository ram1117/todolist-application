import Storage from './storage.js';
import Task from './task.js';
export default class TaskInterface {
  constructor() {
    this.listElement = document.querySelector('.todo-list');
    this.todoInputElement = document.querySelector('#todolist-input');
    this.todoInputElement.onkeyup = (event) => {
      if(event.key==='Enter'){
        this.addTask();
      }
    }
    this.listElement.onclick = () => {

    }
  }

  addTask() {
    let arr = Storage.getTaskArray();
    let task = new Task(arr.length+1,this.todoInputElement.value,false);
    arr.push(task);
    Storage.setTaskArray(arr);
    this.listElement.insertBefore(this.createTaskTile(task),this.listElement.lastElementChild);
    this.todoInputElement.value='';
  }

  loadTasks() {
    Storage.getTaskArray().forEach((task) => {
      this.listElement.insertBefore(this.createTaskTile(task),this.listElement.lastElementChild);
    });
  }

  createTaskTile(task){
    const listItem = document.createElement('li');
    listItem.classList.add('todo-list-item');

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = task.completed;
    checkBox.id = task.id;

    const taskDetail = document.createElement('p');
    taskDetail.classList.add('task-details');
    taskDetail.textContent = task.details;
    taskDetail.readOnly='true';

    const iconSpan = document.createElement('span');
    iconSpan.classList.add('material-icons', 'button-more');
    iconSpan.textContent = 'more_vert';

    listItem.appendChild(checkBox);
    listItem.appendChild(taskDetail);
    listItem.appendChild(iconSpan);
    return listItem;
  }
}