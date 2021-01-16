import { HallOfFame } from '../HallOfFame';
import { GameModeSelect } from '../GameModeSelect';
import { GameOver } from '../GameOver';
import ApiDataFetcher from '../../services/ApiDataFetcher/ApiDataFetcher';
import { GameEngine } from '../../services/GameEngine/GameEngine';
import { Timer } from '../Timer';

export const App = ({ options }) => {
  const rankingBtn = document.querySelector('.button--ranking');
  const modeRules = document.querySelector('.mode__rules');
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

  const hallOfFame = new HallOfFame(
    document.querySelector('#halloffame'),
    config,
  );
  const gameOver = new GameOver({
    element: document.querySelector('#gameovermodal'),
    config: config,
    handleScoreSubmit: (result) =>
      hallOfFame.saveResult(result) || hallOfFame.update(),
  });

  //do wykorzystania także, gdy skończą się pytania
  function onGameOver() {
    gameOver.display();
    timer.hide();
    inGameMode.hidden = true;
    rankingBtn.hidden = false;
    playTheGame.hidden = false;
    btnSettings.hidden = false;
    switchToHall();
    gameMode.enableButtons();
  }

  const gameMode = new GameModeSelect(config);

  const timer = new Timer({
    element: document.querySelector('#progress'),
    config: config,
    announceGameOver: onGameOver,
  });
  /*to się przydaje do testów w sytuacji, gdy skończyły się pytania
  document
    .querySelector('.answers__option')
    .addEventListener('click', () => onGameOver());*/

  btnSettings.addEventListener('click', () => {
    btnSettings.hidden = true;

    document.querySelector('.mode__rules').hidden = true;
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
    rankingBtnTxt.innerHTML = 'Hall of fame';
    rankingBtnIcon.classList = 'fas fa-id-badge';
    hallOfFame.hide();
    modeRules.hidden = false;
  }

  function switchToHall() {
    rankingBtnTxt.innerHTML = 'Rules';
    rankingBtnIcon.classList = 'fas fa-graduation-cap';
    hallOfFame.display();
    modeRules.hidden = true;
  }

  function switchBtn() {
    rankingBtnTxt.innerHTML === 'Hall of fame'
      ? switchToHall()
      : switchToRules();
  }

  //get data from API based on active game mode
  const apiDataFetcher = new ApiDataFetcher(options.swApiBaseUrl);
  playTheGame.addEventListener('click', () => play(config.selectedGame));

  async function play(gameMode) {
    const quiz = new GameEngine(gameMode, apiDataFetcher);
    await quiz.fetchAllQuestionsForMode(gameMode);
    const nextQuestion = quiz.generateNextQuestion();
    updateUI(nextQuestion);
  }
  function updateUI(data) {
    console.log('data for update UI', data);
  }
  playTheGame.addEventListener('click', setGameInProgressView);

  function setGameInProgressView() {
    modeRules.hidden = true;
    rankingBtn.hidden = true;
    playTheGame.hidden = true;
    btnSettings.hidden = true;
    inGameMode.hidden = false;
    timer.display();
    hallOfFame.hide();
    gameMode.disableButtons();
  }
};
