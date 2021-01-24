
const allAnswersKeyIndex = 3;
const correctAnswerKeyIndex = 2;

export class GameLevel {
  constructor() {
    this.element = document.getElementsByClassName('settings')[0];
    this.level = 'easy';
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
      </div>`;
 
  }

  displayGameLevel() {
    this.element.innerHTML = `${this.gameLevel()}`;
  }

  hideGameLevel() {

    this.element.innerHTML = ''; 
  }

  saveGameLevel() {
    if (document.getElementById('easy').checked) {
      this.level = 'easy';
    } else if (document.getElementById('medium').checked) {
      this.level = 'medium';
    } else if (document.getElementById('hard').checked) {
      this.level = 'hard';
    }
    return this.level;
  }

  setGameLevel(nextQuestion) {
    const gameLevelObject = {};
    const questionKeys = Object.keys(nextQuestion);
    const possibleAnswers = nextQuestion[questionKeys[allAnswersKeyIndex]];
    const correctAnswer = nextQuestion[questionKeys[correctAnswerKeyIndex]];
    if (this.level === 'easy') {
      for (const key of possibleAnswers) {
        gameLevelObject[key] = 0.25;
      }
    } else if (this.level === 'medium') {
      for (const key of possibleAnswers) {
        gameLevelObject[key] = 0.2;
        gameLevelObject[correctAnswer] = 0.4;
      }
    } else if (this.level === 'hard') {
      for (const key of possibleAnswers) {
        gameLevelObject[key] = 0.05;
        gameLevelObject[correctAnswer] = 0.85;
      }
    }
    return gameLevelObject;
  }
}

