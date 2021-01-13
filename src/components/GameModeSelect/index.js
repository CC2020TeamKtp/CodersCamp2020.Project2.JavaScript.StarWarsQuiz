export class GameModeSelect {
  constructor(config) {
    this.config = config;
    this.init();
  }

  init() {
    const gameModeItems = document.querySelectorAll(`.menu__item`);
    gameModeItems.forEach((modeItem) => {
      modeItem.addEventListener(`click`, (e) => {
        this.changeGameModeClassList(e.target);
        this.setSelectedGameMode(e.target.innerText.toLowerCase());
      });
    });
  }

  changeGameModeClassList(selectedElement) {
    const gameMode = document.querySelector('.menu__item--selected');
    gameMode.classList.remove('menu__item--selected');
    selectedElement.classList.add('menu__item--selected');
  }

  setSelectedGameMode(selectedElement) {
    this.config.selectedGame = selectedElement;
  }
}
