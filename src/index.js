import './style.css';
import TaskInterface from '../modules/taskInterface.js';
import RemovetasksUI from '../modules/removetasksui.js';

window.onload = () => {
  const taskUI = new TaskInterface();
  taskUI.loadTasks();
  const removeUi = new RemovetasksUI();
  removeUi.addClickListener();
};