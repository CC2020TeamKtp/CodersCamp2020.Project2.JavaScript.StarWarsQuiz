import { HallOfFame } from '../HallOfFame';
import { GameModeSelect } from '../GameModeSelect';
import { GameOver } from '../GameOver';
import ApiDataFetcher from '../../services/ApiDataFetcher/ApiDataFetcher';
import { GameEngine } from '../../services/GameEngine/GameEngine';
import { Timer } from '../Timer';
import { GameView } from '../GameView';
import { ControlButtons } from '../ControlButtons';
import { GameDescription } from '../GameDescription';
import { SoundEffects } from '../SoundEffects';
import { ComputerMind } from '../../services/ComputerMind/ComputerMind';
import { GameLevel } from '../GameLevel';

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
    handleGameSummary: (playerHasWon) =>
      soundEffects.playFinalMelody(playerHasWon),
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

  const soundEffects = new SoundEffects();
  soundEffects.display();

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

  function handleGameOver() {
    gameOver.display(gameOverResults);
    timer.hide();
    inGameMode.hidden = true;
    controlButtons.display();
    gameMode.enableButtons();
    controlButtons.switchToHall();
  }

  let nextQuestion = {};
  let gameOverResults = [];
  let level = 0;
  let quiz = {};
  const computerMind = new ComputerMind();

  async function play(gameMode) {
    gameOverResults = [];
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

  function handleAnswerSelected(playerAnswer, correctAnswer) {
    setTimeout(() => {
      const gameLevelObject = gameLevel.setGameLevel(nextQuestion);
      const randomComputerAnswer = computerMind.generateRandomComputerAnswer(
        gameLevelObject,
        nextQuestion.question.id,
      );
      const gameView = new GameView(handleAnswerSelected);
      gameOverResults.push({
        playerAnswer: playerAnswer,
        correctAnswer: { name: correctAnswer, id: randomComputerAnswer.imgId },
        computerAnswer: randomComputerAnswer.computerSelection,
      });
      nextQuestion = quiz.generateNextQuestion();
      gameView.displayQuestion(nextQuestion);
    }, 1000);
    soundEffects.playBeeper(correctAnswer === playerAnswer);
  }

  function setGameInProgressView() {
    gameDescription.hide();
    controlButtons.hide();
    inGameMode.hidden = false;
    timer.display();
    hallOfFame.hide();
    gameMode.disableButtons();
  }
};
