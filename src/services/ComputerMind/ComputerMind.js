export class ComputerMind {
  //losowanie odpowiedzi komputera

  generateRandomComputerAnswer(gameLevelObject, questionId) {
    let sum = 0;
    const randomNumber = Math.random();

    for (let computerSelection in gameLevelObject) {
      sum += gameLevelObject[computerSelection];
      if (randomNumber <= sum) {
        return {
          computerSelection: computerSelection,
          imgId: questionId,

        };
      }
    }
  }
}
