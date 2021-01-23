export class GameDescription {
  constructor({ config, apiDataFetcher }) {
    this.photo = document.querySelector('#game_photo');
    this.description = document.querySelector('#game_description');
    this.descriptionHeader = document.querySelector('#game_description_header');
    this.config = config;
    this.apiDataFetcher = apiDataFetcher;
    this.setGameDescription(this.config.selectedGameMode);
  }

  async setGameDescription(selectedGameMode, skipDescription) {
    const descriptionAsset = await this.apiDataFetcher.getRandomAsset(
      selectedGameMode,
    );
    this.setPhoto(selectedGameMode, descriptionAsset);
    this.setDescriptionHeader(selectedGameMode);
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
            Wars is showed in the photo (${descriptionAsset.name} right now) from
            available options.
            </p>`;
  }

  setPhoto(selectedGameMode, descriptionAsset) {
    const id = this.apiDataFetcher.extractIdFromUrl(descriptionAsset.url);
    this.photo.className = `question__photo`;
    this.photo.innerHTML = `        <img
    class="question__image"
    src="./static/assets/img/modes/${selectedGameMode}/${id}.jpg"
    alt="image for quiz question"
    />`;
  }

  setDescriptionHeader(selectedGameMode) {
    this.descriptionHeader.className = 'mode__type';
    this.descriptionHeader.innerText = `MODE: ${this.getDescriptionTitle(
      selectedGameMode,
    )}`;
  }

  getDescriptionTitle(selectedGameMode) {
    switch (selectedGameMode) {
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
      this.config.selectedGameMode,
      !this.description.innerHTML,
    );
}
