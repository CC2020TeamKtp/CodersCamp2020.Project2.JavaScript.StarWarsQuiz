export class ComputerMind {
  //ustawianie prawdopodobienstwa
  setGameLevel(nextQuestion) {
    const gameLevelObject = {};
    const questionKeys = Object.keys(nextQuestion);
    const possibleAnswers = nextQuestion[questionKeys[3]]
    const correctAnswer = nextQuestion[questionKeys[2]]
    if (document.getElementById('easy').checked) {
      for (const key of possibleAnswers) {
        gameLevelObject[key] = 0.25;
      }
    } else if (document.getElementById('medium').checked) {
      for (const key of possibleAnswers) {
        gameLevelObject[key] = 0.20;
        gameLevelObject[correctAnswer] = 0.40;

      }
    } else if (document.getElementById('hard').checked) {
      for (const key of possibleAnswers) {
        gameLevelObject[key] = 0.05;
        gameLevelObject[correctAnswer] = 0.85;

      }
    }
    return gameLevelObject
  }


  //losowanie odpowiedzi komputera
  randomComputerAnswer(randomObject, nextQuestion) {
    let i,
      sum = 0,
      randomNumber = Math.random(),
      questionKeys = Object.keys(nextQuestion)

    for (i in randomObject) {
      sum += randomObject[i];
      if (randomNumber <= sum) {
        return {
         
            computerSelection: i,
            imgId: nextQuestion[questionKeys[1]].id
          
        }
      }
    }
  }

  gameLevel() {
    return           
     `<div id="GameLevel">
        <input  type="radio" id="easy" name="gameLevel" value="easy" checked>
        <label for="easy" class="game_level" >Easy</label>    
        <input type="radio" id="medium" name="gameLevel" value="medium">
        <label for="medium" class="game_level">Medium</label>      
        <input type="radio" id="hard" name="gameLevel" value="hard">
        <label for="hard" class="game_level">Hard</label>
      </div>`;
  }

}