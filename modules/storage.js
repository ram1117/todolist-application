export default class Storage{
  static getTaskArray(){
    let array = JSON.parse(localStorage.getItem('task-array'));
    return array===null? []: array;
  }
  static setTaskArray(arr){
    localStorage.setItem('task-array',JSON.stringify(arr));
  }
}