import {
  HallOfFame
} from '../HallOfFame';
import {
  GameModeSelect
} from '../GameModeSelect';
import {
  GameOver
} from '../GameOver';
import ApiDataFetcher from '../../services/ApiDataFetcher/ApiDataFetcher';
import {
  GameEngine
} from '../../services/GameEngine/GameEngine';
import {
  Timer
} from '../Timer';
import {
  GameView
} from '../GameView';
import {ComputerMind} from '../../services/ComputerMind/ComputerMind';

export const App = ({
  options
}) => {
  const rankingBtn = document.querySelector('.button--ranking');
  const modeRules = document.querySelector('.mode__rules');
  const rankingBtnTxt = rankingBtn.querySelector('.button__text');
  const rankingBtnIcon = rankingBtn.querySelector('.fas');

  const GameLevel = document.getElementById("GameLevel");

  const playTheGame = document.querySelector('.button--play');
  const inGameMode = document.querySelector('.mode__game-in-progress');

  const config = {
    selectedGame: `people`,
    quizMaxTime: options.quizMaxTime,
  };

  const hallOfFame = new HallOfFame(config);

  const gameOver = new GameOver({
    config: config,
    handleScoreSubmit: (result) =>
      hallOfFame.saveResult(result) || hallOfFame.update(),
  });

  //do wykorzystania także, gdy skończą się pytania
  function handleGameOver() {
    gameOver.display();
    timer.hide();
    inGameMode.hidden = true;
    rankingBtn.hidden = false;
    playTheGame.hidden = false;

    switchToHall();
    gameMode.enableButtons();
  }

  const gameMode = new GameModeSelect(config);

  const timer = new Timer({
    config: config,
    announceGameOver: handleGameOver,
  });
  /*to się przydaje do testów w sytuacji, gdy skończyły się pytania
  document
    .querySelector('.answers__option')
    .addEventListener('click', () => handleGameOver());*/



  rankingBtn.addEventListener('click', switchBtn);

  function switchToRules() {
    rankingBtnTxt.innerText = 'Hall of fame';
    rankingBtnIcon.classList = 'fas fa-id-badge';
    hallOfFame.hide();
    modeRules.hidden = false;
  }

  function switchToHall() {
    rankingBtnTxt.innerText = 'Rules';
    rankingBtnIcon.classList = 'fas fa-graduation-cap';
    hallOfFame.display();
    modeRules.hidden = true;
  }

  function switchBtn() {
    rankingBtnTxt.innerText === 'Hall of fame' ?
      switchToHall() :
      switchToRules();
  }

  let nextQuestion = {};
  const gameOverResults = [];
  let currentPlayerAnswer = "";
  let quiz = {};
  //get data from API based on active game mode
  const apiDataFetcher = new ApiDataFetcher(options.swApiBaseUrl);
  playTheGame.addEventListener('click', () => play(config.selectedGame));

  async function play(gameMode) {
    quiz = new GameEngine(gameMode, apiDataFetcher);

    await quiz.fetchAllQuestionsForMode(gameMode);
    
    const gameView = new GameView(handleAnswerSelected);
    nextQuestion = quiz.generateNextQuestion();
    gameView.displayQuestion(nextQuestion);

  }

  function handleAnswerSelected(PlayerAnswer, CorrectAnswer){
    setTimeout(() => {
      const computerMind = new ComputerMind();
      const setGameLevel = computerMind.setGameLevel(nextQuestion);
      const computerSelection = computerMind.randomComputerAnswer(setGameLevel, nextQuestion)
 
      const gameView = new GameView(handleAnswerSelected);
      gameOverResults.push({playerAnswer: PlayerAnswer, 
                            correctAnswer: {name: CorrectAnswer, id:computerSelection.imgId}, 
                            computerAnswer: computerSelection.computerSelection,
                            });
      console.log('GameOverResult: ',gameOverResults);
      nextQuestion = quiz.generateNextQuestion();
      gameView.displayQuestion(nextQuestion);
    }, 1000);
  }
 


  playTheGame.addEventListener('click', setGameInProgressView);

  function setGameInProgressView() {
    modeRules.hidden = true;
    rankingBtn.hidden = true;
    playTheGame.hidden = true;
    GameLevel.hidden = true;
    inGameMode.hidden = false;
    timer.display();
    hallOfFame.hide();
    gameMode.disableButtons();
  }
};