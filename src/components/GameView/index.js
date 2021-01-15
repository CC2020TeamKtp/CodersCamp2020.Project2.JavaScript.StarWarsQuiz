export class GameView {
  constructor() {
    this.answersWrapper = document.querySelector('.answers');
    this.questionImg = document.querySelector('.question__image');
    this.currentQuestion = {};
  }

  generateAnswerBtn(answerText) {
    return `<button class="button answers__option">${answerText}</button>`;
  }

  generateQuestionsHTML(possibleAnswers) {
    return possibleAnswers
      .map((answer) => this.generateAnswerBtn(answer))
      .join('');
  }

  displayQuestion(questionData) {
    this.currentQuestion = questionData;
    console.log('question data: ', questionData);
    this.answersWrapper.innerHTML = this.generateQuestionsHTML(
      questionData.allAnswers,
    );
    this.questionImg.src = questionData.question.imgUrl;
    Array.from(this.answersWrapper.children).forEach((btn) =>
      btn.addEventListener('click', (event) =>
        this.handleClick(event, this.currentQuestion),
      ),
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
    const chosenAnswer = target.innerText;
    const correctAnswer = currentQuestion.correctAnswer;
    const correctColor = 'green';
    const incorrectColor = 'red';
    if (chosenAnswer === correctAnswer) {
      this.changeBtnColor(target, correctColor);
    } else {
      this.changeBtnColor(target, incorrectColor);
    }
  }
}
