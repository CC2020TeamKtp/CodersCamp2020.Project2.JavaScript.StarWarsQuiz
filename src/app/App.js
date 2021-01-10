import { Quiz } from './Quiz';
import { HallOfFame } from './components/HallOfFame';

export const App = ({ options }) => {
  const rankingBtn = document.querySelector('.button--ranking');
  const modeHall = document.querySelector('#halloffame');
  const hallOfFameElement = new HallOfFame(modeHall);
  const modeRules = document.querySelector('.mode__rules');
  const rankingBtnTxt = rankingBtn.querySelector('.button__text');
  const rankingBtnIcon = rankingBtn.querySelector('.fas');
  const btnSettings = document.querySelector('.button--settings');
  const formSettings = document.querySelector('form');
  const btnBack = document.querySelector('.button--back');
  const buttonForce = document.querySelector('.submit');
  const gameModes = document.querySelectorAll('.menu__item');
  const playTheGame = document.querySelector('.button--play');
  let selectedGame = document
    .querySelector('.menu__item--selected')
    .innerHTML.toLowerCase();
  let randomizedQuizObject;
  const inGameMode = document.querySelector('.mode__game-in-progress');
  const progresBarContainer = document.querySelector('.progress');

  btnSettings.addEventListener('click', () => {
    btnSettings.hidden = true;

    document.querySelector('.mode__rules').hidden = true;
    document.querySelector('.mode__type').hidden = true;
    document.querySelector('.button--ranking').hidden = true;
    document.querySelector('.button--play').hidden = true;
    document.querySelector('.question__image').hidden = true;
    document.querySelector('table').hidden = true;
    document.querySelector('.mode__hall').hidden = true;
    formSettings.hidden = false;
    btnBack.hidden = false;
  });

  btnBack.addEventListener('click', () => {
    //window.location.reload();
  });

  buttonForce.addEventListener('click', submitResult);

  function onLoadHide() {
    formSettings.hidden = true;
    btnBack.hidden = true;
  }

  onLoadHide();

  rankingBtn.addEventListener('click', switchBtn);
  function switchBtn() {
    if (rankingBtnTxt.innerHTML === 'Hall of fame') {
      rankingBtnTxt.innerHTML = 'Rules';
      rankingBtnIcon.classList = 'fas fa-graduation-cap';
      hallOfFameElement.display();
      hallOfFameElement.update();
    } else {
      rankingBtnTxt.innerHTML = 'Hall of fame';
      rankingBtnIcon.classList = 'fas fa-id-badge';
      hallOfFameElement.hide();
    }
    modeRules.hidden = !modeRules.hidden;
  }

  // issue 16 hall of fame//
  function submitResult() {
    const result = {
      //przerobić na pobieranie inputu z html i wyniku z js/html
      name: document.querySelector('.form__input').value,
      answered: 20,
      correct: 10 + Math.floor(Math.random() * 20),
    };
    hallOfFameElement.saveResult(result);
    const modal = document.querySelector('.modal');
    modal.hidden = true;
  }

  // dynamicaly set active game mode
  gameModes.forEach((mode) => {
    mode.addEventListener('click', (e) => {
      gameModes.forEach((mode) => {
        mode.classList.remove('menu__item--selected');
      });
      e.target.classList.add('menu__item--selected');
      selectedGame = document
        .querySelector('.menu__item--selected')
        .innerHTML.toLowerCase();
    });
  });
  //get data from API based on active game mode
  const quizData = new Quiz();
  playTheGame.addEventListener('click', () => play(selectedGame));

  function play(gameMode) {
    !quizData[gameMode].length &&
      fetch(`https://swapi.dev/api/${gameMode}/`)
        .then((response) => response.json())
        .then((data) => {
          data.results.map((gameObject) => {
            quizData.setData(gameMode, gameObject.name);
          });
        })
        .then(() => {
          randomizedQuizObject = quizData.getRandomQuizObject(gameMode);
          updateUI(randomizedQuizObject); //for now just console it
        });
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
    progresBarContainer.style.display = 'flex';
    document.querySelector('div.mode__rules.mode__hall').style.display = 'none';
  }
};
