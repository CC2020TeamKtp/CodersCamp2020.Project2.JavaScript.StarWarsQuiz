export class GameLevel{

     
    constructor(b,level) {    
        this.element = document.getElementsByClassName('question__photo')[0];
        this.b=b;
        this.level = level;    
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
          </div>` 
      }
    
      displayGameLevel(){
        this.element.children[1].innerHTML = `${this.gameLevel()}`;
        
      }

      hideGameLevel(){
        this.element.children[1].innerHTML = ''///.hidden = true;
      }
      
      saveGameLevel(){
     
        if (document.getElementById('easy').checked) {
           this.b = 1
            
        }
             
           else if (document.getElementById('medium').checked) {
             this.b = 2
            
      
            }
           else if (document.getElementById('hard').checked) {
             this.b = 3
            
          }
          return this.b;
      
      }
      setGameLevel(nextQuestion) {
        this.level = this.b
        const gameLevelObject = {};
        const questionKeys = Object.keys(nextQuestion);
        const possibleAnswers = nextQuestion[questionKeys[3]]
        const correctAnswer = nextQuestion[questionKeys[2]]
        if (this.level === 1) {
          for (const key of possibleAnswers) {
            gameLevelObject[key] = 0.25;
          }
        } else if (this.level === 2) {
          for (const key of possibleAnswers) {
            gameLevelObject[key] = 0.20;
            gameLevelObject[correctAnswer] = 0.40;
    
          }
        } else if (this.level === 3) {
          for (const key of possibleAnswers) {
            gameLevelObject[key] = 0.05;
            gameLevelObject[correctAnswer] = 0.85;
    
          }
        }
        return gameLevelObject
      }
    
    
    }