import taskUi from '../modules/taskInterface.js';

describe('testing addTask and removeTask functions',()=>{
  document.body.innerHTML = `<ul class="todo-list" data-long-press-delay="1000">
    <li class="todo-list-item"><input id="todolist-input" value="task 2" placeholder="Add to your list.." type="text"><span
        class="material-icons" id="enter-button">subdirectory_arrow_left</span></li>
    <li class="button-clear"><div id="button-clear">Clear all completed</div></li>
  </ul>`;
  test('testing addTask()- one <li> to be added to <ul>', () => {
    const taskinterface = new taskUi();
    taskinterface.addTask();
    const todoList = document.querySelectorAll('.todo-list-task');
    expect(todoList).toHaveLength(1);
    
  });
  test('testing addTask()-Local storage array has one object',()=>{
    expect(JSON.parse(localStorage.getItem('task-array'))).toHaveLength(1);
  });
  test('testing removeTask()-- one <li> to be removed from <ul>', () => {
    const taskinterface = new taskUi();
    taskinterface.removeTask(0);
    const todoList = document.querySelectorAll('.todo-list-task');
    expect(todoList).toHaveLength(0);
  });
  test('testing removeTask()-Local storage array is empty',()=>{
    expect(JSON.parse(localStorage.getItem('task-array'))).toHaveLength(0);
  });  
});

