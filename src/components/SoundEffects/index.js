export class SoundEffects {
  constructor() {
    this.element = document.querySelector('#sound_btn');
    this.isMuted = true;
    this.soundCorrectAnswer = new Audio(
      './static/assets/sound/correctAnswer.mp3',
    );
    this.soundIncorrectAnswer = new Audio(
      './static/assets/sound/incorrectAnswer.mp3',
    );
    this.soundFailure = new Audio('./static/assets/sound/failure.mp3');
    this.soundVictory = new Audio('./static/assets/sound/victory.mp3');
  }

  display() {
    this.element.innerHTML = `
    <button class="button button--sound">
          <i class="fas fa-volume-mute"></i>
    `;
    this.element.addEventListener('click', () => this.toggleSoundEffects());
  }

  toggleSoundEffects() {
    this.isMuted = !this.isMuted;
    this.element
      .querySelector('.button--sound i')
      .classList.toggle('fa-volume-up');
    this.element
      .querySelector('.button--sound i')
      .classList.toggle('fa-volume-mute');
  }

  playBeeper(isCorrectAnswer) {
    if (this.isMuted) return;
    isCorrectAnswer
      ? this.soundCorrectAnswer.play()
      : this.soundIncorrectAnswer.play();
  }

  playFinalMelody(playerHasWon) {
    if (this.isMuted) return;
    playerHasWon ? this.soundVictory.play() : this.soundFailure.play();
  }
}
