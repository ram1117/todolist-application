import './style.css';
import TaskInterface from '../modules/taskInterface.js';
import RemovetasksUI from '../modules/removetasksui.js';
import Dragdropui from '../modules/dragdropinterface.js';

window.onload = () => {
  const taskUI = new TaskInterface();
  taskUI.loadTasks();
  const removeUi = new RemovetasksUI();
  removeUi.addClickListener();
  const dragui = new Dragdropui();
  dragui.init();
};