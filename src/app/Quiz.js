import { shuffle } from './shuffle';
import { findImageUrl } from './findImageUrl'
export class Quiz {
  constructor() {
    this.people = [];
    this.vehicles = [];
    this.starships = [];
  }
  setData(query, data) {
    switch (query) {
      case 'people':
        this.people.push(data);
        break;
      case 'vehicles':
        this.vehicles.push(data);
        break;
      case 'starships':
        this.starships.push(data);
        break;
    }
  }
  getRandomQuizObject(gameMode) {
    let indices = [];
    let name, imgIndex;
    while (indices.length < 4) {
      let randomIndex = Math.floor(Math.random() * 9) + 1; //9 is hardcoded becasue this is exactly how many we get from swapi
      if (indices.indexOf(randomIndex) === -1) indices.push(randomIndex)
    }
    name = this[gameMode][indices[0]]
    imgIndex = indices[0]
    return {
      [gameMode]: {
        correctAnswer: {
          name ,
          imgUrl: findImageUrl(gameMode, imgIndex),
        },
        possibleAnswers: shuffle(indices.map((index) => this[gameMode][index]))
      },
    };
  }
}
