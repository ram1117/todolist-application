import TaskUI from "../modules/taskInterface";
import Task from "../modules/task";

describe('testing task completion updates', () => {

  let arr = [];
  arr.push(new Task(arr.length + 1, 'task 1'));
  localStorage.setItem('task-array', JSON.stringify(arr));

  document.body.innerHTML = `<ul class="todo-list" data-long-press-delay="1000">
  <li class="todo-list-item"><input id="todolist-input" value="task 2" placeholder="Add to your list.." type="text"><span
      class="material-icons" id="enter-button">subdirectory_arrow_left</span></li>
  <li class="todo-list-item todo-list-task" id="1" draggable="true"><input type="checkbox"><input type="text" class="task-details" readonly="true"><span class="material-icons button-delete" style="display: none;">delete</span><span class="material-icons button-more">more_vert</span></li>
      `;

  const checkbox = document.querySelector('input[type=checkbox]');
  checkbox.checked = true;
  const taskIterface = new TaskUI();
  taskIterface.updateTaskStatus(checkbox);

  test('testing checkbox update', () => {
    const task = JSON.parse(localStorage.getItem('task-array'))[0];
    expect(task.completed).toBeTruthy;
  });
});