export default class Dragdropui {
  constructor() {
    this.dragged = null;
    this.target = null;
    this.draggables = document.querySelectorAll('.todo-list-task');
    this.container = document.querySelector('.todo-list');
  }

  init() {
    this.draggables.forEach((tasktile) => {
      tasktile.addEventListener('dragstart', (event) => {
        this.dragged = event.target;
      });

      tasktile.addEventListener('dragover', (event) => {
        event.preventDefault();
        const node = event.target.parentNode;
        if (node.tagName === 'LI' && node.classList.contains('todo-list-task')) {
          this.target = node;
        }
      });
    });
    this.container.addEventListener('drop', (event) => {
      event.preventDefault();
      if (this.target !== null && this.dragged !== null) {
        const dragId = parseInt(this.dragged.id, 10);
        const targetId = parseInt(this.target.id, 10);
        if (dragId < targetId) {
          this.container.removeChild(this.dragged);
          this.container.insertBefore(this.dragged, this.target.nextSibling);
        } else if (dragId === targetId) {
          this.updateContainerDetails();
        } else {
          this.container.removeChild(this.dragged);
          this.container.insertBefore(this.dragged, this.target);
        }
        this.updateContainerDetails();
      }
    });
  }

  updateContainerDetails() {
    this.draggables = document.querySelectorAll('.todo-list-task');
    for (let i = 0; i < this.draggables.length; i += 1) {
      this.draggables[i].id = i + 1;
    }
  }
}