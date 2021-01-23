export class GameLevel {


  constructor(b, level) {
    this.element = document.getElementsByClassName('settings')[0];
    this.b = b;
    this.level = level;
  }


  gameLevel() {
    return `
      <div class="switch">
        <input name="switch" id="easy" type="radio" checked/>
        <label for="easy" class="switch__easy">Easy</label>
        <input name="switch" id="medium" type="radio" />
        <label for="medium" class="switch__label">Medium</label>
        <input name="switch" id="hard" type="radio" />
        <label for="hard" class="switch__expert" >Expert</label>
        <div class="switch__indicator" /></div>
      </div>`
  }

  displayGameLevel() {
    this.element.innerHTML = `${this.gameLevel()}`;

  }

  hideGameLevel() {
    this.element.innerHTML = '' ///.hidden = true;
  }

  saveGameLevel() {

    if (document.getElementById('easy').checked) {
      this.b = 1

    } else if (document.getElementById('medium').checked) {
      this.b = 2


    } else if (document.getElementById('hard').checked) {
      this.b = 3

    }
    return this.b;

  }
  setGameLevel(nextQuestion) {
    this.level = this.b
    const gameLevelObject = {};
    const questionKeys = Object.keys(nextQuestion);
    const possibleAnswers = nextQuestion[questionKeys[3]]
    const correctAnswer = nextQuestion[questionKeys[2]]
    if (this.level === 1) {
      for (const key of possibleAnswers) {
        gameLevelObject[key] = 0.25;
      }
    } else if (this.level === 2) {
      for (const key of possibleAnswers) {
        gameLevelObject[key] = 0.20;
        gameLevelObject[correctAnswer] = 0.40;

      }
    } else if (this.level === 3) {
      for (const key of possibleAnswers) {
        gameLevelObject[key] = 0.05;
        gameLevelObject[correctAnswer] = 0.85;

      }
    }
    return gameLevelObject
  }


}