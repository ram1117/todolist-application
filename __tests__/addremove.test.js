import taskUi from '../modules/taskInterface.js';
jest.mock('../modules/taskInterface.js');
test('testing add function', () => {

  document.body.innerHTML = `<ul class="todo-list" data-long-press-delay="1000">
  <li class="todo-list-item">
    <p id="todolist-header">Today's To Do</p><span class="material-icons">refresh</span>
  </li>
  <li class="todo-list-item"><input id="todolist-input" placeholder="Add to your list.." type="text"><span
      class="material-icons" id="enter-button">subdirectory_arrow_left</span></li>
  <li class="button-clear"><div id="button-clear">Clear all completed</div></li>
</ul>`;
  const taskinterface = new taskUi();
  taskinterface.addTask();
  const todoList = document.querySelectorAll('.todo-list li');
  expect(todoList).toHaveLength(3);
});