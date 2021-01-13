export class HallOfFame {
  constructor(element, config) {
    this.element = element;
    this.config = config || { selectedGameMode: 'people' };
  }

  hide() {
    this.element.innerHTML = '';
  }

  display() {
    this.element.innerHTML = `
    <div class="mode__hall mode__rules">
      <p class="mode__title">
        <i class="fas fa-id-badge"></i> Mode ranking
      </p>
      ${this.getTableHTML()}
    </div>`;
  }

  getTableHTML() {
    let results = this.getBestResults();
    if (results.length) {
      return `
      <table class="ranking__table">
        <tr class="ranking__header">
          <th class="ranking__header--bold">Place</th>
          <th class="ranking__header--bold">Player</th>
          <th class="ranking__header--bold">Answered</th>
        </tr>
          ${this.getRowHTML(1, results[0])}
          ${this.getRowHTML(2, results[1])}
          ${this.getRowHTML(3, results[2])}
      </table>
      `;
    } else {
      return `<h2 class="ranking__invitation">Our hall of fame is waiting for your results!</h2>`;
    }
  }
  getRowHTML(pos, data) {
    return `
    <tr class="ranking__row ranking__row--${
      ['first', 'second', 'third'][pos - 1]
    }">
      <td class="ranking__place">${['1st', '2nd', '3rd'][pos - 1]}</td>
      <td class="ranking__name">${data ? data.name : ''}</td>
      <td class="ranking__score">${this.displayScore(data)}</td>
    </tr>`;
  }

  displayScore = (data) => (data ? data.correct + '/' + data.answered : '');

  getScore = ({ correct: c, answered: a }) => c * 100 - (a - c) * 50;

  saveResult(result) {
    let resultStorage = this.getBestResults();
    resultStorage.unshift(result);
    resultStorage = resultStorage
      .sort((a, b) => this.getScore(b) - this.getScore(a))
      .slice(0, 3);
    localStorage.setItem(
      `results_${this.config.selectedGameMode}`,
      JSON.stringify(resultStorage),
    );
  }

  getBestResults() {
    return (
      JSON.parse(
        localStorage.getItem(`results_${this.config.selectedGameMode}`),
      ) || []
    );
  }
}
