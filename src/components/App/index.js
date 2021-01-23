import { HallOfFame } from '../HallOfFame';
import { GameModeSelect } from '../GameModeSelect';
import { GameOver } from '../GameOver';
import ApiDataFetcher from '../../services/ApiDataFetcher/ApiDataFetcher';
import { GameEngine } from '../../services/GameEngine/GameEngine';
import { Timer } from '../Timer';
import {GameView} from '../GameView';
import { ControlButtons } from '../ControlButtons';
import { GameDescription } from '../GameDescription';
import {ComputerMind} from '../../services/ComputerMind/ComputerMind';
import {GameLevel} from '../GameLevel';

export const App = ({ options }) => {
  const inGameMode = document.querySelector('.mode__game-in-progress');

  const config = {
    selectedGameMode: `people`,
    quizMaxTime: options.quizMaxTime,
  };
  
  const gameLevel = new GameLevel();
  gameLevel.displayGameLevel();

  const hallOfFame = new HallOfFame(config);

  const apiDataFetcher = new ApiDataFetcher(options.swApiBaseUrl);

  const gameOver = new GameOver({
    config: config,
    handleScoreSubmit: (result) =>
      hallOfFame.saveResult(result) || hallOfFame.update(),
  });

  const gameDescription = new GameDescription({
    config: config,
    apiDataFetcher: apiDataFetcher,
  });

  const gameMode = new GameModeSelect(handleGameModeChange);

  function handleGameModeChange(selectedGameMode) {
    config.selectedGameMode = selectedGameMode;
    gameDescription.update();
    hallOfFame.update();
  }

  const timer = new Timer({
    config: config,
    announceGameOver: handleGameOver,
  });

  const controlButtons = new ControlButtons({
    handleSwitchToRules: () =>
      hallOfFame.hide() ||
      gameDescription.setGameDescription(config.selectedGameMode),
    handleSwitchToHall: () => hallOfFame.display() || gameDescription.hide(),
    handlePlayTheGame: () => play(config.selectedGameMode),
  });
  controlButtons.display();

  //do wykorzystania także, gdy skończą się pytania
  function handleGameOver() {
    gameOver.display();
    timer.hide();
    inGameMode.hidden = true;
    controlButtons.display();
    gameMode.enableButtons();
    controlButtons.switchToHall();
    gameLevel.displayGameLevel();
  }

  let nextQuestion = {};
  const gameOverResults = [];
  let level = 0;
  let quiz = {};
  const computerMind = new ComputerMind();

  async function play(gameMode) {
    level = gameLevel.saveGameLevel();
    quiz = new GameEngine(gameMode, apiDataFetcher, handleGameOver);
    const gameView = new GameView(handleAnswerSelected);
    try {
      await quiz.fetchAllQuestionsForMode(gameMode);
    } catch (err) {
      gameView.displayNoQuestionsFetchedError();
    }
    nextQuestion = quiz.generateNextQuestion();
    gameView.displayQuestion(nextQuestion);
    setGameInProgressView();
  }
  
  
  function handleAnswerSelected(playerAnswer, correctAnswer){
    setTimeout(() => {     
      console.log(level);
       const setGameLevel = gameLevel.setGameLevel(nextQuestion, level);
       const computerSelection = computerMind.randomComputerAnswer(setGameLevel, nextQuestion)
       const gameView = new GameView(handleAnswerSelected);
       gameOverResults.push({playerAnswer: playerAnswer, 
                             correctAnswer: {name: correctAnswer, id:computerSelection.imgId}, 
                             computerAnswer: computerSelection.computerSelection,
                             });
       console.log('GameOverResult: ', gameOverResults);
       console.log(setGameLevel);
       nextQuestion = quiz.generateNextQuestion();
       gameView.displayQuestion(nextQuestion);
    }, 1000);
  }

  function setGameInProgressView() {
    gameDescription.hide();
    controlButtons.hide();
    inGameMode.hidden = false;
    timer.display();
    gameLevel.hideGameLevel();
    hallOfFame.hide();
    gameMode.disableButtons();
  }
};
