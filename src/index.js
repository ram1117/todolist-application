import './style.css';
import TaskInterface from '../modules/taskInterface.js';

window.onload = () => {
  const taskUI = new TaskInterface();
  taskUI.loadTasks();
};