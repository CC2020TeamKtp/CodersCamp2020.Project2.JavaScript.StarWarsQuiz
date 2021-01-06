export const App = ({ options }) => {
  const rankingBtn = document.querySelector('.button--ranking');
  const modeHall = document.querySelector('.mode__hall');
  const modeRules = document.querySelector('.mode__rules');
  const rankingBtnTxt = rankingBtn.querySelector('.button__text');
  const rankingBtnIcon = rankingBtn.querySelector('.fas');
  const btnSettings = document.querySelector('.button--settings');
  const formSettings = document.querySelector('form');
  const btnBack = document.querySelector('.button--back');
  const btnPlay = document.querySelector('.button--play');
  console.log(btnPlay)

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
    window.location.reload();
  });

  function onLoadHide() {
    formSettings.hidden = true;
    btnBack.hidden = true;
  }

  onLoadHide();

  modeHall.hidden = true;
  rankingBtn.addEventListener('click', switchBtn);
  function switchBtn() {
    if (rankingBtnTxt.innerHTML === 'Hall of fame') {
      rankingBtnTxt.innerHTML = 'Rules';
      rankingBtnIcon.classList = 'fas fa-graduation-cap';
    } else {
      rankingBtnTxt.innerHTML = 'Hall of fame';
      rankingBtnIcon.classList = 'fas fa-id-badge';
    }

    modeHall.hidden = !modeHall.hidden;
    modeRules.hidden = !modeRules.hidden;
  }

  btnPlay.addEventListener('click', setGameInProgressView);

  function setGameInProgressView() {
    document.querySelector('.mode__rules').hidden = true;
    document.querySelector('.button--ranking').hidden = true;
    btnPlay.hidden = true;
    btnSettings.hidden = true;
    document.querySelector('.mode__game-in-progress').hidden = false;
    document.querySelector('.progress').style.display = 'flex';
  }
  
};
