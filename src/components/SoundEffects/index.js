export class SoundEffects {
  constructor() {
    this.element = document.querySelector('#soundBtn');
    this.isMuted = true;
  }

  display() {
    const soundBtn = document.createElement('div');
    soundBtn.innerHTML = `
    <button class="button button--sound">
          <i class="fas fa-volume-mute"></i>
    `;
    this.element.appendChild(soundBtn);
    soundBtn.addEventListener('click', () => this.toggleIcon());
  }

  toggleIcon() {
    this.isMuted = !this.isMuted;
    this.element
      .querySelector('.button--sound i')
      .classList.toggle('fa-volume-up');
    this.element
      .querySelector('.button--sound i')
      .classList.toggle('fa-volume-mute');
  }

  playBeeper(correct) {
    if (this.isMuted) return;
    const soundCorrect = new Audio('/static/assets/sound/correctAnswer.mp3');
    const soundIncorrect = new Audio(
      '/static/assets/sound/incorrectAnswer.mp3',
    );
    correct ? soundCorrect.play() : soundIncorrect.play();
  }

  playFinalMelody(playerHasWon) {
    if (this.isMuted) return;
    const soundFailure = new Audio('/static/assets/sound/failure.mp3');
    const soundVictory = new Audio('/static/assets/sound/victory.mp3');
    playerHasWon ? soundVictory.play() : soundFailure.play();
  }
}
