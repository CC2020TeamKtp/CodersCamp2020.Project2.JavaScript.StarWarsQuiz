export const App = ({ options }) => {
  const buttonRanking = document.querySelector('.button--ranking');

  function switchToHallOfFame() {
    buttonRanking.lastElementChild.innerText = 'Rules';
    buttonRanking.firstElementChild.classList = 'fas fa-graduation-cap';

    document.querySelector('.mode__hall').hidden = false;
    document.querySelector('.mode__rules').hidden = true;

    buttonRanking.addEventListener('click', switchToRules);
    buttonRanking.removeEventListener('click', switchToHallOfFame);
  }
  function switchToRules() {
    buttonRanking.lastElementChild.innerText = 'Hall of fame';
    buttonRanking.firstElementChild.classList = 'fas fa-id-badge';
    document.querySelector('.mode__hall').hidden = true;
    document.querySelector('.mode__rules').hidden = false;
    buttonRanking.addEventListener('click', switchToHallOfFame);
    buttonRanking.removeEventListener('click', switchToRules);
  }

  switchToRules();
};
