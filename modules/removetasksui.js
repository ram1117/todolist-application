import Storage from './storage.js';
import TaskInterface from './taskInterface.js';

export default class RemovetasksUI {
  constructor() {
    this.removeBtn = document.querySelector('#button-clear');
    this.taskarray = null;
  }

  addClickListener() {
    this.removeBtn.onclick = () => {
      this.removeCompletedTasks();
    };
  }

  removeCompletedTasks() {
    this.taskarray = Storage.getTaskArray();
    const arr = [];
    this.taskarray.forEach((task) => {
      if (!task.completed) {
        arr.push(task);
      }
    });
    Storage.setTaskArray(arr);
    const taskUI = new TaskInterface();
    taskUI.updateTaskId();
    taskUI.loadTasks();
  }
}