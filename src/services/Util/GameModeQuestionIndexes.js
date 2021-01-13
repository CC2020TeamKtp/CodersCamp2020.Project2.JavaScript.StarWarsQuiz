  const PEOPLE_INDEXES = Array.from({length: 82}, (_, index) => index + 1);
  const STARSHIPS_INDEXES = [5, 9, 10, 11, 12, 13, 15, 21, 22, 23, 27, 28, 29, 31, 39, 40, 41, 43, 47, 48];
  const VEHICLES_INDEXES = [4, 6, 7, 8, 14, 16, 18, 19, 20, 24, 25, 26, 30, 33, 34, 35, 36, 38, 42];

  export const gameModeQuestionIndexes = {
    people: PEOPLE_INDEXES,
    starships: STARSHIPS_INDEXES,
    vehicles: VEHICLES_INDEXES,
  }
