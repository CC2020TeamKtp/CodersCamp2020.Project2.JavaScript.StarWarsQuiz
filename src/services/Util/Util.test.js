import Util from './Util';

describe('Util', () => {
  beforeEach(() => {
    jest
      .spyOn(global.Math, 'random')
      .mockReturnValueOnce(0.43)
      .mockReturnValueOnce(0.13)
      .mockReturnValueOnce(0.65)
      .mockReturnValueOnce(0.99);
  });

  test.each([3, 1, 4, 5])(
    'should remove %f element value',
    (expectedRemovedElement) => {
      const possibleIds = [1, 2, 3, 4, 5];
      expect(Util.removeOneAtRandom(possibleIds)).toEqual(
        expectedRemovedElement,
      );
    },
  );

  test.each([
    [4, []],
    [1, [4]],
    [6, [4, 1]],
    [9, [1, 2, 3, 6, 8]],
  ])(
    'should generate random value of %f given array of exlusions: %s',
    (expectedResult, excludeArray) => {
      const maxValue = 10;

      expect(Util.randomizeUnique(maxValue, excludeArray)).toEqual(
        expectedResult,
      );
    },
  );

  test.each([3, 1, 4, 5])('should retrieve %f', (expectedRemovedElement) => {
    const array = [1, 2, 3, 4, 5];
    expect(Util.getRandomArrayElement(array)).toEqual(expectedRemovedElement);
  });

  test('should shuffle array', () => {
    const expectedShuffledArray = [4, 5, 2, 1, 3];
    const array = [1, 2, 3, 4, 5];

    expect(Util.shuffle(array)).toEqual(expectedShuffledArray);
  });
});
