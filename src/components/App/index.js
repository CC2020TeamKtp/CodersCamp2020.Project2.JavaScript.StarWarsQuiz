import { HallOfFame } from '../HallOfFame';
import { GameModeSelect } from '../GameModeSelect';
import { GameOver } from '../GameOver';
import ApiDataFetcher from '../../services/ApiDataFetcher/ApiDataFetcher';
import { GameEngine } from '../../services/GameEngine/GameEngine';
import { Timer } from '../Timer';
import { GameView } from '../GameView';
import { GameDescription } from '../GameDescription';

export const App = ({ options }) => {
  const rankingBtn = document.querySelector('.button--ranking');
  const rankingBtnTxt = rankingBtn.querySelector('.button__text');
  const rankingBtnIcon = rankingBtn.querySelector('.fas');
  const btnSettings = document.querySelector('.button--settings');
  const formSettings = document.querySelector('form');
  const btnBack = document.querySelector('.button--back');
  const playTheGame = document.querySelector('.button--play');
  const inGameMode = document.querySelector('.mode__game-in-progress');

  const config = {
    selectedGame: `people`,
    quizMaxTime: options.quizMaxTime,
  };

  const hallOfFame = new HallOfFame(config);

  const apiDataFetcher = new ApiDataFetcher(options.swApiBaseUrl);

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
    btnSettings.hidden = false;
    switchToHall();
    gameMode.enableButtons();
  }

  const gameDescription = new GameDescription({
    config: config,
    apiDataFetcher: apiDataFetcher,
  });

  const gameMode = new GameModeSelect(handleGameModeChange);

  function handleGameModeChange(selected) {
    config.selectedGame = selected;
    gameDescription.setGameDescription(selected);
  }

  const timer = new Timer({
    config: config,
    announceGameOver: handleGameOver,
  });
  /*to się przydaje do testów w sytuacji, gdy skończyły się pytania
  document
    .querySelector('.answers__option')
    .addEventListener('click', () => handleGameOver());*/

  btnSettings.addEventListener('click', () => {
    btnSettings.hidden = true;

    document.querySelector('.mode___description').hidden = true;
    document.querySelector('.mode__type').hidden = true;
    document.querySelector('.button--ranking').hidden = true;
    document.querySelector('.button--play').hidden = true;
    document.querySelector('.question__image').hidden = true;
    hallOfFame.hide();
    formSettings.hidden = false;
    btnBack.hidden = false;
  });

  btnBack.addEventListener('click', () => {
    window.location.reload();
  });

  function onLoadHide() {
    formSettings.hidden = true;
    btnBack.hidden = true;
  }

  onLoadHide();

  rankingBtn.addEventListener('click', switchBtn);

  function switchToRules() {
    rankingBtnTxt.innerText = 'Hall of fame';
    rankingBtnIcon.classList = 'fas fa-id-badge';
    hallOfFame.hide();
    document.querySelector('.mode__rules').hidden = false;
  }

  function switchToHall() {
    rankingBtnTxt.innerText = 'Rules';
    rankingBtnIcon.classList = 'fas fa-graduation-cap';
    hallOfFame.display();
    document.querySelector('.mode__rules').hidden = true;
  }

  function switchBtn() {
    rankingBtnTxt.innerText === 'Hall of fame'
      ? switchToHall()
      : switchToRules();
  }

  //get data from API based on active game mode
  playTheGame.addEventListener('click', () => play(config.selectedGame));

  async function play(gameMode) {
    const quiz = new GameEngine(gameMode, apiDataFetcher);

    await quiz.fetchAllQuestionsForMode(gameMode);

    const gameView = new GameView();
    const nextQuestion = quiz.generateNextQuestion();
    gameView.displayQuestion(nextQuestion);
  }

  playTheGame.addEventListener('click', setGameInProgressView);

  function setGameInProgressView() {
    document.querySelector('.mode__rules').hidden = true;
    rankingBtn.hidden = true;
    playTheGame.hidden = true;
    btnSettings.hidden = true;
    inGameMode.hidden = false;
    timer.display();
    hallOfFame.hide();
    gameMode.disableButtons();
  }
};
