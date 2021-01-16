export class Timer {
  constructor({ element, config, announceGameOver }) {
    this.element = element;
    this.config = config;
    this.announceGameOver = announceGameOver;
    this.timeOutId = '';
  }

  hide() {
    this.element.innerHTML = '';
    clearTimeout(this.timeOutId);
  }

  maxTimeInSeconds = () => Math.floor(this.config.quizMaxTime / 1000);

  display() {
    this.element.innerHTML = `
    <div class="progress">
        <div class="progress__lightSaber">
            <img
                class="progress__saberHandle"
                src="static/assets/img/LightsaberHandle.png"
                alt="light saber"
            />
            <div class="progress__saberLight">
                <div class="progress__saberLight--lit"></div>
            </div>
        </div>
        <div class="progress__time">Time Left: 
            <span class="progress__timeLeft">${this.maxTimeInSeconds()}s
            </span>
        </div>
    </div>`;
    this.startTimer();
  }

  startTimer = () => this.handleSecond(this.maxTimeInSeconds());

  handleSecond(secondsLeft) {
    this.updateLightSaber(secondsLeft);
    if (secondsLeft <= 0) {
      this.announceGameOver();
    } else {
      this.timeOutId = setTimeout(
        () => this.handleSecond(secondsLeft - 1),
        1000,
      );
    }
  }

  updateLightSaber(secondsLeft) {
    const time = this.element.querySelector('.progress__timeLeft');
    const light = this.element.querySelector('.progress__saberLight--lit');
    if (!time || !light) return; //na wypadek schowania elementu między update'ami
    time.innerText = secondsLeft + 's';
    light.style.width = `${Math.floor(
      (100 * secondsLeft) / this.maxTimeInSeconds(),
    )}%`;
  }
}
