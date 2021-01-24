export class GameOver {
  constructor({ config, handleScoreSubmit, handleGameSummary }) {
    this.element = document.querySelector('#gameovermodal');
    this.config = config;
    this.handleScoreSubmit = handleScoreSubmit;
    this.results = [];
    this.handleGameSummary = handleGameSummary;
  }

  hide() {
    this.element.innerHTML = '';
  }

  display(results) {
    this.processAnswers(results);
    this.element.innerHTML = `
    <div class="modal">
        <h1 class="modal__title">game over - ${this.getResultMessage()}</h1>
        ${this.getSummaryIntro()}
        <div class="modal__answers">
            <img class="modal__answers--img" src="./static/assets/ui/MasterYodaLeft.png"/>
            <div class="modal__answers--table">
                ${this.getSummaryTable()}
            </div>
        </div>
        ${this.getForm()}
    </div>`;
    this.element
      .querySelector('.submit')
      .addEventListener('click', () => this.submitResult());
  }

  displayScore = (data) => (data ? data.correct + '/' + data.answered : '');
  getScore = ({ correct: c, answered: a }) => c * 100 - (a - c) * 50;
  getForm() {
    return `<form>
        <div class="form">
          <input class="form__input" id="name" />
          <label for="name">
            Please fill your name in order to receive eternal glory in whole
            Galaxy!
          </label>
        </div>
        <div class="submit">
          <button type="button">may the force be with you!</button>
        </div>
      </form>`;
  }
  getResultMessage() {
    const playerHasWon =
      this.getScore(this.playerScore) > this.getScore(this.computerScore);
    this.handleGameSummary(playerHasWon);
    return playerHasWon
      ? 'you have won'
      : 'may the force be with you next time';
  }
  getSummaryIntro() {
    return `
    <p class="modal__description">
    The force is strong in you young Padawan! During 1 minute you have correctly answered
    ${this.displayScore(
      this.playerScore,
    )} questions. And Computer guessed ${this.displayScore(this.computerScore)}.
    </p>
  `;
  }

  getSummaryTable() {
    return `   
     <table class="table">
       <caption>Detailed answers</caption>
        <tr>
            <th></th>
            <th>You</th>
            <th>Computer</th>
            <th>Answer</th>
        </tr>
         ${this.rowsGenerator()}
    </table>`;
  }

  getSummaryRow({ correctAnswer, playerAnswer, computerAnswer }) {
    return `<tr>
        <td>
          ${this.getImage(correctAnswer.id)}
        </td>
        <td class="table__cell--${
          playerAnswer === correctAnswer.name ? 'correct' : 'incorrect'
        }">${playerAnswer}</td>
        <td class="table__cell--${
          computerAnswer === correctAnswer.name ? 'correct' : 'incorrect'
        }">${computerAnswer}</td>
        <td>${correctAnswer.name}</td>
      </tr>`;
  }

  getImage(id) {
    return `<img class="table__img" src="./static/assets/img/modes/${this.config.selectedGameMode}/${id}.jpg" />`;
  }

  rowsGenerator() {
    return this.results.map((row) => this.getSummaryRow(row)).join('');
  }

  processAnswers(results) {
    this.results = results;
    this.playerScore = {
      correct: this.results.filter(
        (ans) => ans.playerAnswer === ans.correctAnswer.name,
      ).length,
      answered: this.results.length,
    };
    this.computerScore = {
      correct: this.results.filter(
        (ans) => ans.computerAnswer === ans.correctAnswer.name,
      ).length,
      answered: this.results.length,
    };
  }

  submitResult() {
    const result = {
      name: this.element.querySelector('.form__input').value,
      ...this.playerScore,
    };
    this.handleScoreSubmit(result);
    this.hide();
  }
}
