import { findImageUrl } from '../../components/App/findImageUrl';
import { gameModeQuestionIndexes } from '../Util/GameModeQuestionIndexes';
import Util from '../Util/Util';

export class GameEngine {
  constructor(gameMode, apiDataFetcher) {
    this.gameMode = gameMode;
    this.apiDataFetcher = apiDataFetcher;
    this.allPossibleQuestions = [];
    this.alreadyUsedIndexes = [];
  }

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
    return Promise.all(this.apiDataFetcher.getAllDataForGameMode(gameMode))
      .then((res) => this.extractDataFromFetchResponse(res))
      .then((data) => this.allPossibleQuestions = data)
      .catch((err) => console.error('error while fetching data from API: ', err));
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
    alreadyAskedQuestionIndexes.push(nextQuestionIndex);
    return nextQuestionIndex;
  }

  generateRandomAnswersIndexes(nextQuestionIndex) {
    const allAnswersIndexes = [nextQuestionIndex];
    while (allAnswersIndexes.length < 4) {
      allAnswersIndexes.push(this.getRandomQuestionIndex(this.gameMode, this.alreadyUsedIndexes))
    }
    console.log(`all answers: ${allAnswersIndexes}`)
    return allAnswersIndexes;
  }

  getAllAnswers(nextQuestionIndex) {
    const allAnswersIndexes = this.generateRandomAnswersIndexes(nextQuestionIndex);
    return allAnswersIndexes.map(index => this.allPossibleQuestions[`${index}`].name);
  }

  generateNextQuestion() {
    const nextQuestionIndex = this.getRandomQuestionIndex(this.gameMode, this.alreadyUsedIndexes);
    console.log('question picked: ', this.allPossibleQuestions[nextQuestionIndex]);
    const {name, index:id} = this.allPossibleQuestions[nextQuestionIndex];
    const questionToAsk = { 'name': name, 'imgUrl': findImageUrl(this.gameMode, id) };
    const allAnswers = this.getAllAnswers(nextQuestionIndex);
    return {
     gameMode: this.gameMode,
     question: questionToAsk,
     correctAnswer: name,
     allAnswers: Util.shuffle(allAnswers),
    };
  }
}
