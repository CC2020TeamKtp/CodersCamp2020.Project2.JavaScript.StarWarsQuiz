export const App = ({ options }) => {
  const rankingBtn = document.querySelector('.button--ranking');
  const modeHall = document.querySelector('.mode__hall');
  const modeRules = document.querySelector('.mode__rules');
  const rankingBtnTxt = rankingBtn.querySelector('.button__text');
  const rankingBtnIcon = rankingBtn.querySelector('.fas');
  const btnSettings = document.querySelector('.button--settings');
  const formSettings = document.querySelector('form');
  const btnBack = document.querySelector('.button--back');
  const rankingTable = document.querySelector('.ranking__table');
  const rankingInvitation = document.querySelector('.ranking__invitation');

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
      updateHallOfFame();
    } else {
      rankingBtnTxt.innerHTML = 'Hall of fame';
      rankingBtnIcon.classList = 'fas fa-id-badge';
    }

    modeHall.hidden = !modeHall.hidden;
    modeRules.hidden = !modeRules.hidden;
  }

  // issue 16 hall of fame//
  function getBestResults() {
    return [
      {
        name: 'Ania',
        answered: 20,
        correct: 15,
      },
      {
        name: 'Mateusz',
        answered: 30,
        correct: 14,
      },
      {
        name: 'Leia Organa',
        answered: 23,
        correct: 1,
      },
    ];
  }

  function updateHallOfFame() {
    const results = getBestResults();
    if (!results.length) {
      rankingTable.hidden = true;
      rankingInvitation.hidden = false;
      return;
    } else {
      rankingTable.hidden = false;
      rankingInvitation.hidden = true;

      for (let i = 0; i < results.length; i++) {
        const row = document.querySelector(
          `.ranking__row--${['first', 'second', 'third'][i]}`,
        );
        row.querySelector('.ranking__name').textContent = results[i].name;
        row.querySelector('.ranking__score').textContent =
          results[i].correct + '/' + results[i].answered;
      }
      for (let i = 2; i >= results.length; i--) {
        const row = document.querySelector(
          `.ranking__row--${['first', 'second', 'third'][i]}`,
        );
        row.querySelector('.ranking__name').textContent = '';
        row.querySelector('.ranking__score').textContent = '';
      }
    }
  }
};
