import Phaser from 'phaser';

export default class SaveScoreScene extends Phaser.Scene {
  constructor() {
    super('SaveScore');
  }

  init(data) {
    this.finalScore = data.score;
  }

  preload() {
    this.load.image('reset', 'assets/reset.png');
  }

  create() {
    // add text
    this.add
      .text(
        this.scale.width * 0.5,
        this.scale.height * 0.1,
        'Game Over | Save Score',
        {
          fontSize: 48,
          color: '#00f',
        }
      )
      .setOrigin();
    this.add
      .text(
        this.scale.width * 0.5,
        this.scale.height * 0.2,
        `Final score: ${this.finalScore}`,
        { fontSize: 24 }
      )
      .setOrigin();
    // reset button
    const resetButton = this.add
      .image(this.scale.width * 0.5, this.scale.height * 0.5, 'reset')
      .setScale(0.5);
    resetButton.setInteractive({ useHandCursor: true });
    resetButton.on('pointerdown', () => {
      this.scene.start('game');
    });
    // form
    const form = document.createElement('form');
    form.innerHTML = `
      <input type="text" name="name" placeholder="Enter your name" required minLength="3" maxLength="10" autofocus/>
      <button type="submit">Submit</button>
    `;

    this.add.dom(this.scale.width * 0.5, this.scale.height * 0.3, form);
  }
}
