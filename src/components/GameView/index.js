export class GameView {
  constructor(handleAnswerSelected) {
    this.answersWrapper = document.querySelector('.answers');
    this.questionImg = document.querySelector('.question__image');
    this.currentQuestion = {};
    this.clickableAnswers = true;
    this.handleAnswerSelected = handleAnswerSelected;
  }

  generateAnswerBtn(answerText) {
    return `<button class="button answers__option">${answerText}</button>`;
  }

  generateQuestionsHTML(possibleAnswers) {
    return possibleAnswers
      .map((answer) => this.generateAnswerBtn(answer))
      .join('');
  }

  displayNoQuestionsFetchedError() {
    const answersWrapper = document.querySelector('.answers');
    answersWrapper.classList.add('answers--large');

    const html = `<h1>Oops! sorry</h1>
    <p>It appears there is a problem with API. Please try again later...</p>`;
    answersWrapper.innerHTML = html;
    document.querySelector('#progress').remove();
  }

  enableAnswerButtons = () => {
    const items = document.querySelectorAll('.answers__option');
    items.forEach((item) => {
      item.classList.remove('answers__option--disabled');
    });
  };

  disableAnswerButtons = () => {
    const items = document.querySelectorAll('.answers__option');
    items.forEach((item) => {
      item.classList.add('answers__option--disabled');
    });
  };

  displayQuestion(questionData) {
    if (!questionData) {
      console.log('No questions fetched. Game will not start');
      return;
    }
    this.enableAnswerButtons();
    this.clickableAnswers = true;

    this.currentQuestion = questionData;
    console.log('question data: ', questionData);
    this.answersWrapper.innerHTML = this.generateQuestionsHTML(
      questionData.allAnswers,
    );
    this.questionImg.src = questionData.question.imgUrl;
    Array.from(this.answersWrapper.children).forEach((btn) =>
      btn.addEventListener('click', (event) => {
        if (!this.clickableAnswers) {
          return;
        }
        this.handleClick(event, this.currentQuestion);
      }),
    );
  }

  changeBtnColor(btn, color) {
    console.log('btn: ', btn);
    btn.style.backgroundColor = color;
    setTimeout(() => {
      btn.style.backgroundColor = 'white';
      btn.style.color = 'black';
    }, 1000);
  }

  handleClick({ target }, currentQuestion) {
    this.disableAnswerButtons();

    this.clickableAnswers = false;
    const chosenAnswer = target.innerText;
    const correctAnswer = currentQuestion.correctAnswer;
    const correctColor = 'green';
    const incorrectColor = 'red';
    //  this.handleAnswerSelected(chosenAnswer,correctAnswer)
    if (chosenAnswer === correctAnswer) {
      this.changeBtnColor(target, correctColor);
      this.handleAnswerSelected(chosenAnswer, correctAnswer);
    } else {
      this.changeBtnColor(target, incorrectColor);
      this.handleAnswerSelected(chosenAnswer, correctAnswer);
    }
  }
}
