export class GameDescription {
  constructor({ config, apiDataFetcher }) {
    this.photo = document.querySelector('#game_photo');
    this.description = document.querySelector('#game_description');
    this.descriptionHeader = document.querySelector('#game_description_header');
    this.config = config;
    this.apiDataFetcher = apiDataFetcher;
    this.setGameDescription(this.config.selectedGame);
  }

  async setGameDescription(selected, skipDescription) {
    const descriptionAsset = await this.apiDataFetcher.getRandomAsset(
      this.config.selectedGame,
    );
    this.setPhoto(selected, descriptionAsset);
    this.setDescriptionHeader(selected);
    if (skipDescription) return;
    this.setDescription(descriptionAsset);
  }

  setDescription(descriptionAsset) {
    this.description.className = 'mode__rules';
    this.description.innerHTML = `
            <p class="mode__title">
            <i class="fas fa-graduation-cap"></i> Mode rules
            </p>
            <p class="mode___description">
            You have one minute (1m) to answer as many questions as possible.
            During the game on each question you need to select who from Star
            Wars is showed on the left (${descriptionAsset.name} right now) from
            available options.
            </p>`;
  }

  setPhoto(selected, descriptionAsset) {
    const id = this.apiDataFetcher.extractIdFromUrl(descriptionAsset.url);
    this.photo.className = `question__photo`;
    this.photo.innerHTML = `        <img
    class="question__image"
    src="./static/assets/img/modes/${selected}/${id}.jpg"
    alt="image for quiz question"
    />`;
  }

  setDescriptionHeader(selected) {
    this.descriptionHeader.className = 'mode__type';
    this.descriptionHeader.innerText = `MODE: ${this.getDescriptionTitle(
      selected,
    )}`;
  }

  getDescriptionTitle(selected) {
    switch (selected) {
      case `people`:
        return `Who is this character?`;
      case `vehicles`:
        return `What is this vehicle?`;
      case `starships`:
        return `What is this starship?`;
      default:
        console.log(`No such mode exists`);
    }
  }

  hide() {
    this.description.className = '';
    this.description.innerHTML = '';
  }

  update = () =>
    this.setGameDescription(
      this.config.selectedGame,
      !this.description.innerHTML,
    );
}
