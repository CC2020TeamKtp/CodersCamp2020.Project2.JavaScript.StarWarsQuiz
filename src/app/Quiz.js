// export class Quiz {
//     constructor() {
//         this.people = [];
//         this.vehicles = [];
//         this.starships = [];
//     }
//     set people(data) {
//         this.people.push(data)
//     }
//     set vehicles(data) {
//         this.people.push(data)
//     }
//     set starships(data) {
//         this.people.push(data)
//     }
// }
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
