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
    this.taskarray.forEach((task) => {
      if (task.completed) {
        this.taskarray.splice(this.taskarray.indexOf(task), 1);
      }
    });
    Storage.setTaskArray(this.taskarray);
    const taskUI = new TaskInterface();
    taskUI.updateTaskId();
    taskUI.loadTasks();
  }
}