const allAnswersKeyIndex = 3;
const correctAnswerKeyIndex = 2;

export class GameLevel {
  constructor() {
    this.element = document.getElementsByClassName('settings')[0];
    this.level = 'easy';
  }

  gameLevel() {
    return `
         <div id="GameLevel">
            <input  type="radio" id="easy" name="gameLevel" value="easy" checked>
            <label for="easy" class="game_level" >Easy</label>    
            <input type="radio" id="medium" name="gameLevel" value="medium">
            <label for="medium" class="game_level">Medium</label>      
            <input type="radio" id="hard" name="gameLevel" value="hard">
            <label for="hard" class="game_level">Hard</label>
          </div>`;
  }

  displayGameLevel() {
    this.element.innerHTML = `${this.gameLevel()}`;
  }

  hideGameLevel() {
    this.element.children[1].innerHTML = ''; ///.hidden = true;
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
