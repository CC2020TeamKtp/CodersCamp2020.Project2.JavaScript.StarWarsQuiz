import {gameModePages} from "../Util/GameModePages";

export default class ApiDataFetcher {
  constructor(apiURL) {
    this.apiURL = apiURL;
  }

  extractIdFromUrl(url) {
    const idRegexp = /.*?\/api\/(.*?)\/(\d+)\//;
    return url.match(idRegexp)[2];
  }

  apiDataReducer() {
    return (acc, cur) => {
      const {name, url} = cur;
      acc.push({name: name, index: this.extractIdFromUrl(url)});
      return acc;
    };
  }

  callPageableApi(gameMode, page) {
    const url = `${this.apiURL}/${gameMode}/?page=${page}`;
    return fetch(url)
      .then(res => res.json());
  }
  
  getAllDataForGameMode(gameMode = 'people') {
    const pagesToDownload = gameModePages[`${gameMode}`];
  
    const apiDataPromises = [...Array(pagesToDownload)].map((_, indx) => {
      return this.callPageableApi(gameMode, indx + 1);
    });
    return apiDataPromises;
  }
}
