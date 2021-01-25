import ApiDataFetcher from '../ApiDataFetcher/ApiDataFetcher';
import Util from '../Util/Util';
import * as findImage from '../Util/findImageUrl';
import { GameEngine } from './GameEngine';
const apiDataFetcher = new ApiDataFetcher('http://swapi.dev/api');
const handleNoMoreQuestions = jest.fn();
const gameEngine = new GameEngine(
  `people`,
  apiDataFetcher,
  handleNoMoreQuestions,
);

gameEngine.allQuestions = [
  { name: '1', index: '1' },
  { name: '2', index: '2' },
  { name: '3', index: '3' },
  { name: '4', index: '4' },
];

test('should extract data from fetch response', () => {
  const apiDataObjects = [
    {
      count: 1,
      next: 'test',
      previous: 'test',
      results: [
        {
          name: 'name',
          random: 11,
          url: 'http://swapi.dev/api/people/11/',
        },
      ],
    },
    {
      results: [
        {
          name: 'name',
          random: 11,
          url: 'http://swapi.dev/api/people/1/',
        },
      ],
    },
  ];

  expect(gameEngine.extractDataFromFetchResponse(apiDataObjects)).toEqual([
    { name: 'name', index: '11' },
    { name: 'name', index: '1' },
  ]);
});

test('should generate random answers indexes', () => {
  const allAnswersIndexes = gameEngine.generateRandomAnswersIndexes(48);
  expect(allAnswersIndexes).toContain(48);
  expect(allAnswersIndexes.length).toEqual(4);
});

describe('GameEngine', () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve(
          {
            name: 'name',
            url: 'http://swapi.dev/api/people/10/',
            randomData: 'random data',
          },
          {
            name: 'another name',
            url: 'http://swapi.dev/api/people/1/',
            randomData: 'random data',
          },
        ),
    }),
  );

  test('should fetch all questions for mode', async () => {
    const questions = gameEngine.fetchAllQuestionsForMode('people');
    expect(questions).resolves.toEqual(
      {
        name: 'name',
        index: 10,
      },
      {
        name: 'another name',
        index: 1,
      },
    );
  });

  test.each([
    [0, '1'],
    [1, '2'],
    [2, '3'],
    [3, '4'],
  ])('should get all answer indexes', (questionIndex, name) => {
    gameEngine.generateRandomAnswersIndexes = jest
      .fn()
      .mockImplementation(() => {
        return [0, 1, 2, 3];
      });
    expect(gameEngine.getAllAnswers(questionIndex)).toContain(name);
    expect(gameEngine.getAllAnswers(3).length).toEqual(4);
  });

  test('should find question by index', () => {
    expect(gameEngine.findQuestionByIndex(1)).toEqual({
      name: '1',
      index: '1',
    });
  });

  test('should generate next question', () => {
    Util.removeOneAtRandom = jest.fn().mockImplementation(() => {
      return 1;
    });
    gameEngine.findQuestionByIndex = jest.fn().mockImplementation(() => {
      return { name: '1', index: '1' };
    });
    gameEngine.getAllAnswers = jest.fn().mockImplementation(() => {
      return ['1', '2', '3', '4'];
    });
    findImage.findImageUrl = jest.fn().mockImplementation(() => {
      return './static/assets/img/modes/people/1.jpg';
    });
    Util.shuffle = jest.fn().mockImplementation(() => {
      return ['1', '2', '3', '4'];
    });
    expect(gameEngine.generateNextQuestion()).toEqual({
      gameMode: `people`,
      question: {
        name: '1',
        imgUrl: './static/assets/img/modes/people/1.jpg',
        id: '1',
      },
      correctAnswer: '1',
      allAnswers: ['1', '2', '3', '4'],
    });
  });
});
