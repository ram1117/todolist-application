import Storage from "./storage.js";
export default class Dragdropui{
  constructor(){
    this.dragged = null;
    this.target = null;
    this.draggables = document.querySelectorAll('.todo-list-task');
    this.container = document.querySelector('.todo-list');
  }
  init(){
    this.draggables.forEach(tasktile => {
      tasktile.addEventListener('dragstart',(event)=>{
        this.dragged = event.target;
      });
      
      tasktile.addEventListener('dragover',event=>{
        event.preventDefault();
        let node = event.target.parentNode;
        if(node.tagName==='LI'&& node.classList.contains('todo-list-task')){
          this.target=node;
        }
      });
    });
    this.container.addEventListener('drop',(event)=>{
      event.preventDefault();
      if(this.target!==null && this.dragged!==null){
        let dragId =parseInt(this.dragged.id,10);
        let targetId = parseInt(this.target.id,10);
        // console.log(dragId+'-------'+targetId);
        // console.log(this.dragged);
        // console.log(this.target);
        if(dragId<targetId){
          this.container.removeChild(this.dragged);
          this.container.insertBefore(this.dragged,this.target.nextSibling);
        }
        else if(dragId===targetId){
          
        }
        else{
          this.container.removeChild(this.dragged);
          this.container.insertBefore(this.dragged,this.target);
        }
        this.updateContainerDetails();
      }
    });
  }

  updateContainerDetails(){
    let arr = [];
    let tasktiles = document.querySelectorAll('.todo-list-task');
    for(let i=0;i< tasktiles.length;i+=1){
      tasktiles[i].id=i+1;
    }

  }
}