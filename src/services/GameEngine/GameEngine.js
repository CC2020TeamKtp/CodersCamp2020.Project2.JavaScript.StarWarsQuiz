import { findImageUrl } from '../Util/findImageUrl';
import { gameModeQuestionIndexes } from '../Util/GameModeQuestionIndexes';
import Util from '../Util/Util';

export class GameEngine {
  constructor(gameMode, apiDataFetcher, handleNoMoreQuestions) {
    this.gameMode = gameMode;
    this.apiDataFetcher = apiDataFetcher;
    this.allQuestions = [];
    this.questionIndexes = [...gameModeQuestionIndexes[gameMode]];
    this.handleNoMoreQuestions = handleNoMoreQuestions;
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

  async fetchAllQuestionsForMode(gameMode) {
    try {
      const data = await Promise.all(
        this.apiDataFetcher.getAllDataForGameMode(gameMode),
      );
      const questions = this.extractDataFromFetchResponse(data);
      this.allQuestions = questions;
    } catch (err) {
      throw new Error('error while fetching data from API: ', err);
    }
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
    if (this.allQuestions.length === 0) {
      this.handleNoMoreQuestions();
      return;
    }
    return this.allQuestions.find(
      (question) => parseInt(question.index) === idx,
    );
  }

  generateNextQuestion() {
    console.log('all q:', this.allQuestions);

    const nextQuestionIndex = Util.removeOneAtRandom(this.questionIndexes);

    const nextQuestion = this.findQuestionByIndex(nextQuestionIndex);
    if (!nextQuestion) return;
    const { name, index: id } = nextQuestion;
    const questionToAsk = {
      name: name,
      imgUrl: findImageUrl(this.gameMode, id),
    };
    const allAnswers = this.getAllAnswers(
      this.allQuestions.indexOf(nextQuestion),
    );
    return {
      gameMode: this.gameMode,
      question: questionToAsk,
      correctAnswer: name,
      allAnswers: Util.shuffle(allAnswers),
    };
  }
}
