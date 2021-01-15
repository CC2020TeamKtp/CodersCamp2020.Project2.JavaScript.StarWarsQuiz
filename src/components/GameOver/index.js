export class GameOver {
  constructor({ element, config, handleScoreSubmit }) {
    this.element = element;
    this.config = config;
    this.handleScoreSubmit = handleScoreSubmit;
    //tymczasowe dla testów
    this.playerScore = {
      correct: 10 + Math.floor(Math.random() * 20),
      answered: 30,
    };
    this.computerScore = {
      correct: 10 + Math.floor(Math.random() * 10),
      answered: 30,
    };
  }

  hide() {
    this.element.innerHTML = '';
  }

  display() {
    this.element.innerHTML = `
    <div class="modal">
        <h1 class="modal__title">game over</h1>
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
    return `<img class="table__img" src="./static/assets/img/modes/${this.config.selectedGame}/${id}.jpg" />`;
  }

  rowsGenerator() {
    return this.getAnswers()
      .map((row) => this.getSummaryRow(row))
      .join('');
  }

  getAnswers() {
    //tymczasowe dla testów
    return [
      {
        correctAnswer: { id: 4, name: 'Darth Vader' },
        playerAnswer: 'Darth Vader',
        computerAnswer: 'Darth Father',
      },
      {
        correctAnswer: { id: 36, name: 'Jar Jar Binks' },
        playerAnswer: 'Jar Jar Binks',
        computerAnswer: 'Jar Jar Binks',
      },
      {
        correctAnswer: { id: 4, name: 'Darth Vader' },
        playerAnswer: 'Darth Vader',
        computerAnswer: 'Darth Father',
      },
      {
        correctAnswer: { id: 36, name: 'Jar Jar Binks' },
        playerAnswer: 'Jar Jar Binks',
        computerAnswer: 'Jar Jar Binks',
      },
      {
        correctAnswer: { id: 4, name: 'Darth Vader' },
        playerAnswer: 'Darth Vader',
        computerAnswer: 'Darth Father',
      },
      {
        correctAnswer: { id: 36, name: 'Jar Jar Binks' },
        playerAnswer: 'Jar Jar Binks',
        computerAnswer: 'Jar Jar Binks',
      },
      {
        correctAnswer: { id: 4, name: 'Darth Vader' },
        playerAnswer: 'Darth Vader',
        computerAnswer: 'Darth Father',
      },
    ];
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
