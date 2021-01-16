export class GameModeSelect {
  constructor(config) {
    this.config = config;
    this.enabled = true;
    this.init();
  }

  init() {
    const gameModeItems = document.querySelectorAll(`.menu__item`);
    gameModeItems.forEach((modeItem) => {
      modeItem.addEventListener(`click`, (e) => {
        if (!this.enabled) return;
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

  disableButtons = () => {
    this.enabled = false;
    const items = document.querySelectorAll('.menu__item');
    items.forEach((item) => {
      item.classList.add('menu__item--disabled');
    });
  };

  enableButtons = () => {
    this.enabled = true;
    const items = document.querySelectorAll('.menu__item');
    items.forEach((item) => {
      item.classList.remove('menu__item--disabled');
    });
  };
}
