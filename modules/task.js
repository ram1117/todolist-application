export default class Task {
  constructor(id, details, completed = false) {
    this.id = id;
    this.details = details;
    this.completed = completed;
  }
}