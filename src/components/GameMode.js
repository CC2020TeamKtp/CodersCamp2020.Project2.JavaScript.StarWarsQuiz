export class GameMode {
  constructor(config) {
    this.config = config;
  }

  changeGameMode() {
    const gameModeItems = document.querySelectorAll(`.menu__item`);
    gameModeItems.forEach((modeItem) => {
      modeItem.addEventListener(`click`, (e) => {
        this.changeGameModeClassList(e), this.setSelectedGameMode();
      });
    });
  }

  changeGameModeClassList(e) {
    const gameMode = document.querySelector('.menu__item--selected');
    gameMode.classList.remove('menu__item--selected');
    e.target.classList.add('menu__item--selected');
  }

  setSelectedGameMode() {
    this.config.selectedGameMode = document
      .querySelector('.menu__item--selected')
      .innerText.toLowerCase();
  }
}
