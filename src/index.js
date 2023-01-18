import './style.css';
import TaskInterface from '../modules/taskInterface';

// list.addEventListener('long-press', (event) => {
//   event.preventDefault();
//   console.log(event.target);
// });
window.onload = () => {
  const taskUI = new TaskInterface();
  taskUI.loadTasks();
};