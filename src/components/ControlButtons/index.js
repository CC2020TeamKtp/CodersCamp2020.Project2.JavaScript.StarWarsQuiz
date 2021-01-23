export class ControlButtons {
  constructor({ handleSwitchToRules, handleSwitchToHall, handlePlayTheGame }) {
    this.element = document.querySelector('.buttons');
    this.handleSwitchToRules = handleSwitchToRules;
    this.handleSwitchToHall = handleSwitchToHall;
    this.handlePlayTheGame = handlePlayTheGame;
  }

  display() {
    this.element.innerHTML = `  
    <button class="button button--ranking">
          <i class="fas fa-id-badge"></i>
          <span class="button__text">Hall of fame</span>
    </button>
    <button class="button button--play">play the game
    </button>
`;
    this.rankingBtn = this.element.querySelector('.button--ranking');
    this.rankingBtnTxt = this.rankingBtn.querySelector('.button__text');
    this.rankingBtnIcon = this.rankingBtn.querySelector('.fas');
    this.playTheGame = this.element.querySelector('.button--play');
    this.rankingBtn.addEventListener('click', () => this.switchBtn());
    this.playTheGame.addEventListener('click', this.handlePlayTheGame);
  }

  hide() {
    this.element.innerHTML = '';
  }

  switchToRules() {
    this.rankingBtnTxt.innerText = 'Hall of fame';
    this.rankingBtnIcon.classList = 'fas fa-id-badge';
    this.handleSwitchToRules();
  }

  switchToHall() {
    this.rankingBtnTxt.innerText = 'Rules';
    this.rankingBtnIcon.classList = 'fas fa-graduation-cap';
    this.handleSwitchToHall();
  }

  switchBtn() {
    this.rankingBtnTxt.innerText === 'Hall of fame'
      ? this.switchToHall()
      : this.switchToRules();
  }
}
