
export class ComputerMind {
    //ustawianie prawdopodobienstwa
    setGameLevel(randomObj) {
        let gameLevelObject = {};
        let keys = Object.keys(randomObj);
        let possibleAnsw = randomObj[keys[3]]
        let correctAnsw =  randomObj[keys[2]]
        if (document.getElementById('easy').checked) {
          for (const key of possibleAnsw) {
            gameLevelObject[key] = 0.25;
          }  
        } else if (document.getElementById('medium').checked){ 
            for (const key of possibleAnsw) {
              gameLevelObject[key] = 0.20;
              gameLevelObject[correctAnsw] = 0.40;
    
              }
        } else if (document.getElementById('hard').checked){ 
            for (const key of possibleAnsw) {
              gameLevelObject[key] = 0.05;
              gameLevelObject[correctAnsw] = 0.85;
    
              }
      }   return gameLevelObject    
    }


    //losowanie odpowiedzi komputera
    RandomComputerAnswer(randomObject, randomObj) {
    let i, sum = 0, r = Math.random(), keys = Object.keys(randomObj) 
     
    for (i in randomObject) {
      sum += randomObject[i];
      if (r <= sum) { return {
          Computer: {
          computerSelection: i,
          correctAnswer: randomObj[keys[2]],
          imgUrl: randomObj[keys[1]].imgUrl,
          imgId: randomObj[keys[1]].id
          }
        }
    }       
    }
    
  }

}