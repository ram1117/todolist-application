import './style.css';

const taskArray = [
  { description: 'grocery shopping', completed: false, id: 1 },
  { description: 'send the parcel', completed: true, id: 2 },
  { description: 'buy gift for friend birthday', completed: false, id: 3 },
  { description: 'take dog for a walk', completed: true, id: 4 },
];
const list = document.querySelector('.todo-list');

function loadTasks() {
  taskArray.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.classList.add('todo-list-item');

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = task.completed;
    checkBox.id = task.id;

    const taskDetail = document.createElement('p');
    taskDetail.classList.add('task-details');
    taskDetail.textContent = task.description;

    const iconSpan = document.createElement('span');
    iconSpan.classList.add('material-icons');
    iconSpan.textContent = 'more_vert';

    listItem.appendChild(checkBox);
    listItem.appendChild(taskDetail);
    listItem.appendChild(iconSpan);

    list.appendChild(listItem);
  });
  const removeButton = document.createElement('div');
  removeButton.classList.add('button-remove');
  removeButton.textContent = 'Clear all completed';

  list.appendChild(removeButton);
}

window.onload = () => {
  loadTasks();
};