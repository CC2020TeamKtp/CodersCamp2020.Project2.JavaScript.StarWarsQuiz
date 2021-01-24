import { ComputerMind } from './ComputerMind';

const computerMind = new ComputerMind();

describe('ComputerMind', () => {
  test.each([
    [0.13, 'a'],
    [0.43, 'b'],
    [0.65, 'c'],
    [0.99, 'd'],
  ])('generated %f should give answer %s', (randomValue, answer) => {
    jest.spyOn(global.Math, 'random').mockReturnValue(randomValue);

    const gameLevelObject = {
      a: 0.25,
      b: 0.25,
      c: 0.25,
      d: 0.25,
    };
    const questionId = 14;

    const expectedRandomComputerAnswer = {
      computerSelection: answer,
      imgId: 14,
    };

    expect(
      computerMind.generateRandomComputerAnswer(gameLevelObject, questionId),
    ).toEqual(expectedRandomComputerAnswer);
  });
});