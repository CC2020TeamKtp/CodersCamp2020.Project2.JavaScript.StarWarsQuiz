import { gameModePages } from '../Util/GameModePages';
import Util from '../Util/Util';
import { gameModeQuestionIndexes } from '../Util/GameModeQuestionIndexes';

export default class ApiDataFetcher {
  constructor(apiURL, handleLoaderDisplay) {
    this.apiURL = apiURL;
    this.handleLoaderDisplay = handleLoaderDisplay;
  }

  extractIdFromUrl(url) {
    const idRegexp = /.*?\/api\/(.*?)\/(\d+)\//;
    return url.match(idRegexp)[2];
  }

  apiDataReducer() {
    return (acc, cur) => {
      const { name, url } = cur;
      acc.push({ name: name, index: this.extractIdFromUrl(url) });
      return acc;
    };
  }

  callPageableApi(gameMode, page) {
    const url = `${this.apiURL}/${gameMode}/?page=${page}`;
    return fetch(url).then((res) => res.json());
  }

  getAllDataForGameMode(gameMode = 'people') {
    const pagesToDownload = gameModePages[`${gameMode}`];
    const apiDataPromises = [...Array(pagesToDownload)].map((_, indx) =>
      this.callPageableApi(gameMode, indx + 1),
    );
    return apiDataPromises;
  }

  getRandomAsset(gameMode) {
    const id = Util.getRandomArrayElement(gameModeQuestionIndexes[gameMode]);
    const url = `${this.apiURL}/${gameMode}/${id}`;
    this.handleLoaderDisplay();
    return fetch(url)
      .then((response) => response.json())
      .then((res) => {
        this.handleLoaderDisplay();
        return (({ name, url }) => ({ name, url }))(res);
      });
  }
}
