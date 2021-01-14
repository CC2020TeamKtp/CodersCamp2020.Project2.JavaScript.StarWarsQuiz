import { findImageUrl } from '../../components/App/findImageUrl';
import { gameModeQuestionIndexes } from '../Util/GameModeQuestionIndexes';
import Util from '../Util/Util';

export class GameEngine {
  constructor(gameMode, apiDataFetcher) {
    this.gameMode = gameMode;
    this.apiDataFetcher = apiDataFetcher;
    this.allQuestions = [];
    this.questionIndexes = [...gameModeQuestionIndexes[gameMode]];
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
      .then((data) => (this.allQuestions = data))
      .catch((err) =>
        console.error('error while fetching data from API: ', err),
      );
  }

  generateRandomAnswersIndexes(nextQuestionIndex) {
    const allAnswersIndexes = [nextQuestionIndex];
    while (allAnswersIndexes.length < 4) {
      allAnswersIndexes.push(
        Util.randomizeUnique(this.allQuestions.length, allAnswersIndexes),
      );
    }
    console.log(`all answers indexes: ${allAnswersIndexes}`);
    return allAnswersIndexes;
  }

  getAllAnswers(nextQuestionIndex) {
    const allAnswersIndexes = this.generateRandomAnswersIndexes(
      nextQuestionIndex,
    );
    return allAnswersIndexes.map((index) => this.allQuestions[index].name);
  }

  findQuestionByIndex(idx) {
    return this.allQuestions.find((question) => parseInt(question.index) === idx);
  }

  generateNextQuestion() {
    console.log('all q:', this.allQuestions);

    const metaIndex = Util.removeOneAtRandom(this.questionIndexes);
    const nextQuestionIndex = gameModeQuestionIndexes[this.gameMode][metaIndex];
    const { name, index: id } = this.findQuestionByIndex(nextQuestionIndex);
    const questionToAsk = {
      name: name,
      imgUrl: findImageUrl(this.gameMode, id),
    };
    const allAnswers = this.getAllAnswers(nextQuestionIndex);
    return {
      gameMode: this.gameMode,
      question: questionToAsk,
      correctAnswer: name,
      allAnswers: Util.shuffle(allAnswers),
    };
  }
}
