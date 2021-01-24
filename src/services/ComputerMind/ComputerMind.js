export class ComputerMind {
  //losowanie odpowiedzi komputera
  randomComputerAnswer(randomObject, nextQuestion) {
    let sum = 0;
    const randomNumber = Math.random();
    const questionKeys = Object.keys(nextQuestion);

    for (let computerSelection in randomObject) {
      sum += randomObject[computerSelection];
      if (randomNumber <= sum) {
        return {
          computerSelection: computerSelection,
          imgId: nextQuestion[questionKeys[1]].id,
        };
      }
    }
  }
}
