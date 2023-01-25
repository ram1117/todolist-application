export default class Storage {
  static taskArr;
  static getTaskArray(){
    return this.taskArr===null ? [] : this.taskArr;
  }
  static setTaskArray(arr){
    this.taskArr = [...arr];
  }
}