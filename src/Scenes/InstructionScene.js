import Phaser from 'phaser';
import gameState from '../Config/gameState';

export default class InstructionScene extends Phaser.Scene {
  constructor() {
    super('Instruction');
  }

  create() {
    this.cameras.main.setBackgroundColor('#000111');
    this.introText = this.add.text(0, 0, 'Introduction', {
      fontSize: '32px',
      fill: '#fff',
    });
    // eslint-disable-next-line quotes
    this.madeByText = this.add.text(
      200,
      0,
      'We live in a strange \nworld where some people mistreat they little pets.\nJohn, our hero works in a non-profit organization\n where he needs to save any kind of animals that are hurt.\n It does not matter where (sometimes a city, a florest, or even a cave), \nour hero is always there to do whatever it takes.  \nto Sometimes the pets are too hurt and need medical attention really quick.  \nto Can he fill the task and save the little guys?',
      { align: 'center' }
    );
    this.zone = this.add.zone(800 / 2, 600 / 2, 800, 600);

    this.add
      .text(
        this.scale.width * 0.5 ,
        200,
        'Press space to play again.'
      )
      .setOrigin();

  
    Phaser.Display.Align.In.Center(this.introText, this.zone);

    Phaser.Display.Align.In.Center(this.madeByText, this.zone);
    this.madeByText.setY(650);

    this.introTween = this.tweens.add({
      targets: this.introText,
      y: -200,
      duration: 3000,
      delay: 1000,
    });

    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: -500,
      duration: 60000,
      delay: 0,
      onComplete: () => {
        this.scene.start('Game');
      },
    });

     // Start a new game
    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.start('Game');
    });
  }
  
}
