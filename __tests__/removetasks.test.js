import RemovetasksUI from '../modules/removetasksui';
import Task from '../modules/task';

describe('Removing multiple completed tasks:', () => {
  const arr = [];
  arr.push(new Task(arr.length + 1, 'task 1', true));
  arr.push(new Task(arr.length + 1, 'task 2', false));
  arr.push(new Task(arr.length + 1, 'task 3', true));
  localStorage.setItem('task-array', JSON.stringify(arr));

  document.body.innerHTML = `<ul class="todo-list" data-long-press-delay="1000">
    <li class="todo-list-item"><input id="todolist-input" placeholder="Add to your list.." type="text"><span
        class="material-icons" id="enter-button">subdirectory_arrow_left</span></li>
    <li class="button-clear"><div id="button-clear">Clear all completed</div></li>
  </ul>`;

  const rTasksUI = new RemovetasksUI();
  rTasksUI.removeCompletedTasks();
  test('two tasks marked complete has to be removed:', () => {
    const taskArray = JSON.parse(localStorage.getItem('task-array'));
    expect(taskArray).toHaveLength(1);
    const tasks = document.querySelectorAll('.todo-list-task');
    expect(tasks).toHaveLength(1);
  });
});