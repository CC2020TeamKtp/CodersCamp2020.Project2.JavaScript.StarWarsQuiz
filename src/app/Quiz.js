
export class Quiz {
  constructor() {
    this.people = [];
    this.vehicles = [];
    this.starships = [];
  }
  set data(data) {
    this.data.length < 1 && this[data].push(data);
  }
}
