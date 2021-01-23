export class GameModeSelect {
  constructor(updateGameDescription) {
    this.updateGameDescription = updateGameDescription;
    this.enabled = true;
    this.navList = document.querySelector('#navlist');
    this.setNavList();
    this.init();
  }

  init() {
    const gameModeItems = document.querySelectorAll(`.menu__item`);
    gameModeItems.forEach((modeItem) => {
      modeItem.addEventListener(`click`, (e) => {
        if (!this.enabled) return;
        this.changeGameModeClassList(e.target);
        this.updateGameDescription(e.target.innerText.toLowerCase());
      });
    });
  }

  changeGameModeClassList(selectedElement) {
    const gameMode = document.querySelector('.menu__item--selected');
    gameMode.classList.remove('menu__item--selected');
    selectedElement.classList.add('menu__item--selected');
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

  setNavList() {
    this.navList.innerHTML = `<div class="menu__item menu__item--selected">People</div>
<div class="menu__item menu__item">Vehicles</div>
<div class="menu__item menu__item">Starships</div>`;
  }
}
