export class Quiz {
  constructor() {
    this.people = null;
    this.vehicles = null;
    this.starships = null;
  }
  setData(query, data) {
    switch (query) {
      case 'people':
        this.people = data;
        break;
      case 'vehicles':
        this.vehicles = data;
        break;
      case 'starships':
        this.starships = data;
    }
  }
}
