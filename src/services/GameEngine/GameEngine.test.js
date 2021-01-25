import ApiDataFetcher from '../ApiDataFetcher/ApiDataFetcher';
import { GameEngine } from './GameEngine';
const apiDataFetcher = new ApiDataFetcher('http://swapi.dev/api');
const handleNoMoreQuestions = jest.fn();
const gameEngine = new GameEngine(
  `people`,
  apiDataFetcher,
  handleNoMoreQuestions,
);

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
  gameEngine.allQuestions = [1, 2, 3];
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
});
