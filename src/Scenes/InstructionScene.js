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
      'Welcome to the Game, \n\nWelcome to the Runner game! \nTo go to the end, \njump to every obstacle you encounter. \n\nThe main goal is to get to the end \n of the platforms \nwithout falling off the platform. \n\nTo Jump, press either\n space or the left mouse button. \n\nEach coin has the value of 20 points, so grab\n the most you can to get the most points. \nSo use it with care!\n\n Good luck! \n\n Enjoy this cool game, \n which is played by dozens of player all over\n the globe. \n\nGood Luck Again!',
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
