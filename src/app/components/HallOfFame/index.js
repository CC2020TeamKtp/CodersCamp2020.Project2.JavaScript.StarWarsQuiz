export class HallOfFame {
  constructor(element) {
    this.element = element;
  }
  display() {
    this.element.innerHTML = `
    <div class="mode__hall mode__rules">
            <p class="mode__title">
              <i class="fas fa-id-badge"></i> Mode ranking
            </p>
            <table class="ranking__table">
              <h2 class="ranking__invitation">Our hall of fame is waiting for your results!</h2>
              <tr class="ranking__header">
                <th class="ranking__header--bold">Place</th>
                <th class="ranking__header--bold">Player</th>
                <th class="ranking__header--bold">Answered</th>
              </tr>
              <tr class="ranking__row ranking__row--first">
                <td class="ranking__place ">1st</td>
                <td class="ranking__name">Ania</td>
                <td class="ranking__score">15/20</td>
              </tr>
              <tr class="ranking__row ranking__row--second">
                <td class="ranking__place">2nd</td>
                <td class="ranking__name">Mateusz</td>
                <td class="ranking__score">14/30</td>
              </tr>
              <tr class="ranking__row ranking__row--third">
                <td class="ranking__place">3rd</td>
                <td class="ranking__name">Leia Organa</td>
                <td class="ranking__score">1/23</td>
              </tr>
            </table>
          </div>
        </div>
      </div>`;
  }
  hide() {
    this.element.innerHTML = '';
  }
  saveResult(result) {
    // podział na game type
    let resultStorage = this.getBestResults();
    resultStorage.unshift(result);
    resultStorage = resultStorage
      .sort((a, b) => {
        // logika najlepszego wyniku
        return b.correct - a.correct;
      })
      .slice(0, 3);
    localStorage.setItem('results', JSON.stringify(resultStorage));
  }

  getBestResults() {
    return JSON.parse(localStorage.getItem('results')) || [];
  }

  update() {
    const results = this.getBestResults();
    if (!results.length) {
      this.element.querySelector('.ranking__table').classList.add('hide');
      this.element
        .querySelector('.ranking__invitation')
        .classList.remove('hide');
      return;
    } else {
      this.element.querySelector('.ranking__table').classList.remove('hide');
      this.element.querySelector('.ranking__invitation').classList.add('hide');

      for (let i = 0; i < results.length; i++) {
        const row = this.element.querySelector(
          `.ranking__row--${['first', 'second', 'third'][i]}`,
        );
        row.querySelector('.ranking__name').textContent = results[i].name;
        row.querySelector('.ranking__score').textContent =
          results[i].correct + '/' + results[i].answered;
      }
      for (let i = 2; i >= results.length; i--) {
        const row = this.element.querySelector(
          `.ranking__row--${['first', 'second', 'third'][i]}`,
        );
        row.querySelector('.ranking__name').textContent = '';
        row.querySelector('.ranking__score').textContent = '';
      }
    }
  }
}
