export default class Util {

  static randomizeUnique(max, exludeArray) {
    let randomValue = Math.floor(Math.random() * max);

    while (exludeArray.includes(randomValue)) {
      randomValue = Math.floor(Math.random() * max);
    }
    return randomValue;
  }

  static removeOneAtRandom(possibleIds) {
    return possibleIds.splice(Math.floor(Math.random() * possibleIds.length), 1)[0];
  }

  static shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    return copy;
  }

}
