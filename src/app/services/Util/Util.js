export default class Util {

  static randomizeUnique(min, max, exludeArray) {
    let randomValue = Math.floor(Math.random() * (max - min)) + min;

    while (exludeArray.includes(randomValue)) {
      randomValue = Math.floor(Math.random() * (max - min)) + min;
    }
    return randomValue;
  }

  static getFirstAndLastElement(arr) {
    return [arr[0], arr[arr.length - 1]];
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
