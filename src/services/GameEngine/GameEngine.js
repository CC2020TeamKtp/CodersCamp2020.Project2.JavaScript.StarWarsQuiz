import { findImageUrl } from '../../findImageUrl';
import { gameModeQuestionIndexes } from '../Util/GameModeQuestionIndexes';
import PlayerType from '../Util/PlayerType';

import Util from '../Util/Util';
import ApiDataFetcher from '../ApiDataFetcher/ApiDataFetcher';

export class GameEngine {
  constructor(gameMode, apiDataFetcher) {
    this.gameMode = gameMode;
    this.apiDataFetcher = apiDataFetcher;
    this.allPossibleQuestions = [];
    this.alreadyUsedIndexes = [];
    this.nextQuestionIndex = 0;
  }

  // single question for given GameMode:
  //
  // askedQuestionId
  // correctId
  // answeredId
  // answeredBy

  // uniqueRandom() musi zmniejszac mozliwe indexy zamiast tego while!!!
  // w momencie kiedy skoncza sie unikalne indexy to koniec gry.

  // 1. wczytywanie all danych z api powinno się odbyć przy wyborze trybu gry a nie przy kliknieciu PLAY
  // bo musimy wczytać losową postać do opisu

  // w konstruktorze? przekazanie gameMode dynamicznie / po kliknieciu i reload tej metody?

  // pobieranie

  // this.questions -> ['people', [...], 'vehicle', [...], 'starships', [...]]
  extractDataFromFetchResponse(apiDataObjects) {
    let resultResponse = [];
    apiDataObjects.map((response) => {
      const results = response.results;
      const gathered = results.reduce(this.apiDataFetcher.apiDataReducer(), []);
      resultResponse = resultResponse.concat(gathered);
    });
    return resultResponse;
  }

  fetchAllQuestionsForMode(gameMode) {
    Promise.all(this.apiDataFetcher.getAllDataForGameMode(gameMode))
      .then((res) => this.extractDataFromFetchResponse(res))
      .then((data) => console.log('data fetched from API: ', data))
      .then((data) => this.allPossibleQuestions.concat(data))
      .then((questions) => console.log('all possible questions: ', this.allPossibleQuestions))
      .catch((err) => console.error('error while fetching data from API: ', err),
      );
  }

  getRangeOfQuestions(gameMode) {
    const possibleQuestionIndexes = gameModeQuestionIndexes[`${gameMode}`];
    return Util.getFirstAndLastElement(possibleQuestionIndexes);
  }

  getRandomQuestionIndex(gameMode, alreadyAskedQuestionIndexes) {
    const [minIndx, maxIndx] = this.getRangeOfQuestions(gameMode);
    const nextQuestionIndex = Util.randomizeUnique(
      minIndx,
      maxIndx,
      alreadyAskedQuestionIndexes,
    );
    console.log(`generated next question index as ${nextQuestionIndex}`);
    return nextQuestionIndex;
  }


  generateNextQuestion() {
    const nextQuestionIndex = this.getRandomQuestionIndex(this.gameMode, this.alreadyUsedIndexes);
    this.alreadyUsedIndexes.push(nextQuestionIndex);
    console.log('generated index: ', nextQuestionIndex);
    console.log('question picked: ', this.allPossibleQuestions[`${nextQuestionIndex}`]);
    const {name, index:id} = this.allPossibleQuestions[`${nextQuestionIndex}`];
    const questionToAsk = { 'name': name, 'imgUrl': findImageUrl(this.gameMode, id) };
    const allAnswers = [];
    return {
     'gameMode': this.gameMode,
     'question': questionToAsk,
     'correctAnswer': name,
     'allAnswers': allAnswers,
     'player': PlayerType.HUMAN,
    };
  }

  getOtherPossibleAnswers(gameMode, nextQuestionIndex, allQuestionsForMode) {
    console.log('meh');
  }
}
